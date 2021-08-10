from django.http import HttpRequest, HttpResponse
from django.shortcuts import render


def index(request: HttpRequest) -> HttpResponse:
    """
    Return view with react app

    :param request HttpRequest
    :return HttpResponse
    """
    return render(request, 'index.html')
