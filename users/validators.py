import re
from django.core.exceptions import ValidationError


class FormatValidator(object):
    def __init__(self, regax='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'):
        self.__regax = regax

    def validate(self, password, user=None):
        if re.search(password, self.__regax) is None:
            raise ValidationError(
                'Hasło powino się składać z min 1 małej i dużej litery, cyfry oraz symbolu specjalnego @$!%*?&',
                code='format-password'
            )
