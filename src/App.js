import React from 'react';
import './App.css';



class App extends React.Component{
 

  constructor(){
    super()
    this.state = {
      apiResult : null, 
      author: '',
      quote : '',
      isLoaded : false,
      bgColor : '#c2c2c2'
    }

    this.handleChange = this.handleChange.bind(this)
   
  }

  componentDidMount(){
    fetch ('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json', {
      headers: {
        Accept: 'application/json'
      }
    })
    .then(response => response.json())
    .then((responseData) => {
      this.setState({
        apiResult: responseData.quotes, 
        isLoaded: true,
        author: responseData.quotes[0].author,
        quote: responseData.quotes[0].quote,
        quotesArrayLength: responseData.quotes.length, 
      })
    })
    .catch(error => this.setState({ error }))
  }

  generateQuote = () => {
    const chosenQuote = []
    const quotes = this.state.apiResult
    let randomNumber = Math.floor((Math.random() * this.state.apiResult.length) + 1)

    quotes.map((element, index) => {
      if( index === randomNumber) {
        chosenQuote.push(element)
      }
    })

    return this.setState({
      quote: chosenQuote[0].quote, 
      author:chosenQuote[0].author,
    })

  }

  changeColor = () => {
      const color = ['#ff6f59', '#254441', '#43aa8b', '#b2b09b', '#ef3054']
      let randomColor = Math.floor((Math.random() * color.length - 1) + 1);
      let valueOfRandomColor = color[randomColor] 
      console.log(randomColor.valueOf())
     return this.setState({
       bgColor: valueOfRandomColor
        
      })
  }



  handleChange(){
    
    this.generateQuote()
    this.changeColor()
  }

  render(){
    
    return (    
    <div className="App">
      <style>
        {
          `   
          :root {
            --main-bg-color: ${this.state.bgColor};
            --main-text-color: ${this.state.bgColor};
          }
          `
        }
     
      </style>
      <h1>Random Quote Box Generator</h1>
      <div id="quote-box" className="quote-box">
       
    <p id="text" className="text-style" >{this.state.quote}</p>
    <p id="author" className="author-style" >{this.state.author}</p>
        <button id="new-quote" onClick={this.handleChange}>Random quote</button>
        <br />
        <a href="#" id="tweet-quote">Tweet this!</a>
      </div>

      <footer>Developed by <a href="http://www.github.com/lauselfe">@lauselfe</a></footer>
    </div>
    
    )
  }
  
}

export default App;
