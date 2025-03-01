from django.urls import path
from . import views

urlpatterns = [
    path('', views.HomeView, name="audio-recorder-home"),

    path('utterances/', views.UtteranceListView.as_view(), name="audio-recorder-utterances"),
    path('utterances/user/<username>/', views.UserUtteranceListView.as_view(), name="user-utterances"),
    path('utterances/export/', views.Export.as_view(), name="export-utterances"),
    path('utterances/import/', views.Import.as_view(), name="import-utterances"),
    path('release_lock/', views.ReleaseLockView.as_view(), name='release_lock'),

    path('random_sample/', views.GetRandomSample.as_view(), name='random-sample'),

    path('utterances/<int:pk>/', views.UtteranceDetailView.as_view(), name="utterance-detail"),
    path('utterances/<int:pk>/update/', views.UtteranceUpdateView.as_view(), name="utterance-update"),
    path('utterances/<int:utterance_id>/report/', views.report_utterance, name='report_utterance'),
    path('utterances/<int:pk>/delete/', views.UtteranceDeleteView.as_view(), name="utterance-delete"),
    path('utterances/new/', views.UtteranceCreateView.as_view(), name="utterance-create"),
    path('guide/', views.AnnotationGuideView, name="annotation-guide"),
    path('api/stats/', views.GetStatsView.as_view(), name="get-stats"),
    path('api/get_urls/', views.GetUtterancesURLsView.as_view(), name="get-urls"),
    path('api/add/', views.CreateUtteranceAPI.as_view(), name="add-utterance"),
    path('user-stats/', views.UserStatsView.as_view(), name='user_stats'),
    path('download/', views.DownloadView.as_view(), name="download"),
]

handler404 = 'audio_recorder.views.handler404'