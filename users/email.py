from typing import Optional
from django.core.mail import EmailMultiAlternatives

from WebFilm.settings import EMAIL_HOST_NAME, EMAIL_HOST_USER


class Email:
    def __init__(self, subject: str, recipients: [str], message: str, html_message: Optional[str] = None):
        """
        Init email

        :param subject str
        :param recipients array str, one element User <email@domain.com>
        :param message str message plain text
        :param html_message str html message
        """
        self.__email = EmailMultiAlternatives(
            subject=subject,
            to=recipients,
            from_email=f'{EMAIL_HOST_NAME} <{EMAIL_HOST_USER}>',
            body=message,
        )

        if html_message:
            self.__email.attach_alternative(html_message, 'text/html')
            self.__email.content_subtype = 'html'

    def send_email(self) -> None:
        self.__email.send()
