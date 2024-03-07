import axios from 'axios';

export async function fetchQuestions(currentProduct, setQuestions) {
  if (currentProduct && currentProduct.id) {
    const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`);
    setQuestions(response.data.results
      .sort((a, b) => b.question_helpfulness - a.question_helpfulness));
  }
}

export async function refreshQuestions(currentProduct, setQuestions) {
  console.log('currentProduct', currentProduct);
  console.log('Refreshing questions...');
  if (currentProduct === undefined || currentProduct === null) {
    console.log('currentProduct is either undefined or null');
  }
  console.log('Current product:', currentProduct);
  try {
    const response = await axios.get(`/qa/questions?product_id=${currentProduct.id}`);
    console.log('Response data:', response.data); // Log the response data
    const sortedQuestions = response.data.results
      .sort((a, b) => b.question_helpfulness - a.question_helpfulness);
    console.log('Sorted questions:', sortedQuestions); // Log the sorted questions
    setQuestions(sortedQuestions);
  } catch (error) {
    console.error('Error refreshing questions:', error);
  }
}

export async function markAnswerAsHelpful(answerId, votedHelpfulness, setVotedHelpfulness) {
  if (votedHelpfulness.has(answerId)) {
    return;
  }
  await axios.put(`/qa/answers/${answerId}/helpful`, {});
  const newVotedHelpfulness = new Set(votedHelpfulness);
  newVotedHelpfulness.add(answerId);
  setVotedHelpfulness(newVotedHelpfulness);
  localStorage.setItem('votedHelpfulness', JSON.stringify(Array.from(newVotedHelpfulness)));
}

export async function reportAnswer(answerId, reportedAnswers, setReportedAnswers) {
  if (reportedAnswers.has(answerId)) {
    return;
  }

  const newReportedAnswers = new Set([...reportedAnswers, answerId]);
  setReportedAnswers(newReportedAnswers);

  await axios.put(`/qa/answers/${answerId}/report`, {});
  newReportedAnswers.add(answerId);
  localStorage.setItem('reportedAnswers', JSON.stringify([...newReportedAnswers]));
  setReportedAnswers(new Set(newReportedAnswers));
}

export async function reportQuestion(questionId, reportedQuestions, setReportedQuestions) {
  if (reportedQuestions.has(questionId)) {
    return;
  }

  await axios.put(`/qa/questions/${questionId}/report`, {}, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  });
  const newReportedQuestions = new Set(reportedQuestions);
  newReportedQuestions.add(questionId);
  setReportedQuestions(newReportedQuestions);
  localStorage.setItem('reportedQuestions', JSON.stringify(Array.from(newReportedQuestions)));
}
