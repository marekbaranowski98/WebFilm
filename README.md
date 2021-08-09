# WebFilm [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
Projekt związany z pracą dyplomową pisaną w 2021 roku "Projekt i realizacja serwisu rekomendującego produkcje filmowe.

## Spis treści
* [Technologie](#technologie)
* [Uruchamianie](#uruchamianie)
* [Licencja](#licencja)
* [Autor](#autor)

## Technologie
Projekt jest stworzony w technologiach:
* [Python 3.9.6](https://www.python.org/)
* [Django 3.2.6](https://www.djangoproject.com)
* [Django REST framework 3.12.4](https://www.django-rest-framework.org)
* [MariaDB 10.6.3](https://mariadb.com)

## Uruchamianie
Najpierw należy zainstalować [Git](https://git-scm.com) i [Python](https://www.python.org/).
1. Konfiguracja projektu
   - dla windowsa
    ```shell script
    git config core.autocrlf true
    ```
   - dla maca i linuxa
    ```shell script
    git config core.autocrlf input
    ```
2. Instalacja zależności
    ```shell script
    pip install -r requirements.txt
    ```
3. Zbudowanie obrazu docker
    ```shell script
    docker-compose up -d
    ```
4. Uruchomienie serwra
    ```shell script
    python3 manage.py runserver
    ```
## Licencja
WebFilm jest napisany na [licencji MIT](LICENSE).

### Autor
> GitHub [@marekbaranowski98](https://github.com/marekbaranowski98)
