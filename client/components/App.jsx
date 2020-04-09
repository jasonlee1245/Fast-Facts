import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currentPage: "main",
      newAnswers: [],
      newQuestion: "",
      episodeName: "",
      questionNumber: 0,
      score: 0
    };
  };

  createEpisode() {
    fetch('/api/', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
    .then(() => {
      return this.setState({currentPage: "main", newAnswers: [], newQuestion: "", episodeName: ""});
    })
    .catch(err => console.log('App.addNewApp ERROR', err));
  };

  quit() {
    this.setState({currentPage: "main", newAnswers: [], newQuestion: "", episodeName: "", questionNumber: 0, score: 0});
  };

  startQuiz(index) {
    this.setState({currentPage: index});
  };

  addQuestion(bool) {
    const newAnswers = this.state.newAnswers;
    newAnswers.push({"question": this.state.newQuestion, "answer": bool});
    this.setState({newAnswers: newAnswers, newQuestion: ""});
    document.getElementById("questionInput").value = "";
  };

  questionInput(e) {
    this.setState({newQuestion: e.target.value});
  };

  nameInput(e) {
    this.setState({episodeName: e.target.value});
  };

  answerQuestion(bool) {
    let score = this.state.score;
    let questionNumber = this.state.questionNumber + 1;
    if(this.state.episodes[this.state.currentPage].questions[this.state.questionNumber].answer === bool) {
      score++;
    }
    this.setState({score, questionNumber});
  }
  
  componentDidMount() {
    fetch("/api/")
      .then(res => res.json())
      .then(data => {
        return this.setState({episodes: data});
      })
      .catch(err => console.log("App.componentDidMount ERROR: ", err));
  };

  render() {
    const { episodes, currentPage, newAnswers, newQuestion, episodeName, questionNumber, score} = this.state;
    if(currentPage === "main") {
      const choices = [];
      for(let i = 0; i < episodes.length; i++) {
      choices.push(<button key={i} onClick={() => this.startQuiz(i)}>{episodes[i].name}</button>)
      }
      return (
        <div className="main">
          <div className="title"><h1>Fast Facts</h1></div>
          <div className="center"><button onClick={() => this.setState({currentPage: "create"})}>Create</button></div>
          <br></br>
          <div className="choices">{choices}</div>
        </div>
      );
    }
    else if(currentPage === "create") {
      const answers = [];
      for(let i = 0; i < newAnswers.length; i++) {
      answers.push(<div className="rightSide">
                    <span key={i}>{newAnswers[i].question}</span>
                    <span>{newAnswers[i].answer}</span>
                  </div>)
      }
      return (
        <div  className="main">
          <div className="title"><h1>New Episode</h1></div>
          <div className="center">
            <input id="episodeName" type="text" placeholder="Name of Your Episode" onChange={(e) => this.nameInput(e)}/>
          </div>
          <div className='half'>
            <div>
              <input id="questionInput" type="text" placeholder="Your Question" onChange={(e) => this.questionInput(e)}/>
              <button onClick={()=> this.addQuestion("true")}>True</button>
              <button onClick={()=> this.addQuestion("false")}>False</button>
            </div>
            <div>
              <h2>Answers</h2>
              {answers}
            </div>
          </div>
            <div className="center">
              <button onClick={()=> this.createEpisode()}>Submit</button>
              <button onClick={()=> this.quit()}>Quit</button>
            </div>
        </div>
      );
    }
    else {
      if(questionNumber < episodes[currentPage].questions.length) {
        return (
          <div className="main">
            <div className="title"><h1>{episodes[currentPage].name}</h1></div>
            <div className="center"><h2>{score}/{episodes[currentPage].questions.length}</h2></div>
            <div className="center"><h1>{episodes[currentPage].questions[questionNumber].question}</h1></div>
            <div className="center">
              <button onClick={()=> this.answerQuestion("true")}>True</button>
              <button onClick={()=> this.answerQuestion("false")}>False</button>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="main">
            <div className="title"><h1>{episodes[currentPage].name}</h1></div>
            <div className="center"><h2>{score}/{episodes[currentPage].questions.length}</h2></div>
            <div className="center"><button onClick={()=> this.quit()}>Quit</button></div>
          </div>
        )
      }
    }
  }
}

export default App;