from django.http import HttpRequest, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def index(request: HttpRequest) -> HttpResponse:
    """
    Return view with react app

    :param request HttpRequest
    :return HttpResponse
    """
    return render(request, 'index.html')
