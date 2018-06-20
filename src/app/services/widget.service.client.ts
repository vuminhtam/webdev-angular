export class WidgetServiceClient {
  findWidgetsForTopic(topicId) {
    console.log(topicId);
    return fetch('http://localhost:8080/api/topic/' + topicId + '/widget')
      .then(response => response.json());
  }
}
