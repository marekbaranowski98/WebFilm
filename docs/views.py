from django.http import HttpRequest, HttpResponseRedirect


def show_api_docs(request: HttpRequest) -> HttpResponseRedirect:
    """
    Redirect to api docs

    :param request HttpRequest
    :return HttpResponseRedirect
    """
    return HttpResponseRedirect(f'http://127.0.0.1:8080?url=./v1.0.0.yaml')
