import re
from django.core.exceptions import ValidationError


class FormatValidator(object):
    def __init__(self, regax='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@$%^&*\-_,.?;]).{8,128}$'):
        self.__regax = regax

    def validate(self, password, user=None):
        if re.search(self.__regax, password) is None:
            raise ValidationError(
                'Hasło powino się składać z min 1 małej i dużej litery, cyfry oraz symbolu specjalnego @$!%*?&',
                code='format-password'
            )
