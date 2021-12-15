import uuid


def generate_uuid() -> str:
    return str(uuid.uuid4())


def default_uuid() -> str:
    return '00000000-0000-0000-0000-000000000000'
