import base64
import tempfile
import uuid

from django.core.files.uploadedfile import InMemoryUploadedFile
from google.api_core.client_options import ClientOptions
from google.auth.credentials import AnonymousCredentials
from google.cloud import storage

from WebFilm import settings


class FileManager:
    def __init__(self):
        self.__client = storage.Client(
            credentials=AnonymousCredentials(),
            project="webfilm",
            client_options=ClientOptions(api_endpoint=settings.URL_GCS),
        )

    def get_file(self, bucket_path: str, blob_path: str) -> bytes:
        bucket = self.__client.bucket(bucket_path)
        blob = bucket.blob(blob_path)

        with tempfile.NamedTemporaryFile() as temp_file:
            blob.download_to_filename(temp_file.name)
            temp_file.seek(0, 0)
            return self.__convert_to_base64(temp_file.read())

    def upload_file(self, bucket_path: str, file: InMemoryUploadedFile, destination_blob: str) -> None:
        blob = self.__client.bucket(bucket_path).blob(destination_blob)
        blob.upload_from_string(file.read())

    def generete_uuid(self) -> str:
        return str(uuid.uuid4())

    def __convert_to_base64(self, byte: bytes):
        return base64.b64encode(byte)
