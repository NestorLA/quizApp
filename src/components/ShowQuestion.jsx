const ShowQuestion = ({
  data: { question, correct_answer, answers },
  handleAnswer,
  showAnswers,
  handleNextQuestion,
}) => {
  return (
    <div className="row justify-content-center">
      <div
        className="fw-bold h6"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <div className="col-10 row row-cols-2">
        {answers.map((answer) => {
          const bgColor = showAnswers
            ? answer === correct_answer
              ? "btn-success"
              : "btn-danger"
            : "btn-secondary";
          return (
            <button
              type="button"
              className={`btn ${bgColor}`}
              onClick={() => handleAnswer(answer)}
              dangerouslySetInnerHTML={{
                __html: answer,
              }}
            />
          );
        })}
      </div>
      {showAnswers && (
        <button
          className="btn btn-primary col-4 mt-2 ms-auto"
          onClick={handleNextQuestion}
        >
          Next Question
        </button>
      )}
    </div>
  );
};

export default ShowQuestion;
