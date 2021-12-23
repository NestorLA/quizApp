const ShowQuestion = ({
  data: { question, correct_answer, incorrect_answers },
  handleAnswer,
}) => {
  const shuffledAnswers = [correct_answer, ...incorrect_answers].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="row justify-content-center">
      <div
        className="fw-bold h6"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="col-8 row row-cols-2">
        {shuffledAnswers.map((answer) => (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => handleAnswer(answer)}
            dangerouslySetInnerHTML={{
              __html: answer,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowQuestion;
