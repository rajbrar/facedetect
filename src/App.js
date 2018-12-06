import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
 apiKey: 'd769a1bab66f443ea2565d65e36afdac'
});


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',   
      imageUrl:'',
      box:{}
    }
    //this.onInputChange = this.onInputChange.bind(this)
    //this.onButtonSubmit = this.onButtonSubmit.bind(this)  
  }



calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace); //works
    const image = document.getElementById('inputimage');
    console.log(image);//this is blank
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log('---');
    console.log(this.state.input);
    console.log('---');
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('onButtonSubmit')
    console.log(this.state.input);
    console.log(this.state.imageUrl); //why is this blank??

    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input) 
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch (err => console.log(err));
  }


  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
