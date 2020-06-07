import React from 'react';
import { string } from 'prop-types';
// import { connect } from 'react-redux';
import { PieChart } from 'react-minimal-pie-chart';

class TheLettersCounter extends React.Component  {

  constructor() {
    super();
    this.state = {
      lowerCaseAlphabet: 'abcdefghijklmnopqrstuvwxyz',
      letterCounts: [{ title: 'test', value: 11, color: '#000' }],
    };
  }

  createLettersCounterObject() {
    const { lowerCaseAlphabet } = this.state;
    const { text } = this.props;
    const letters = lowerCaseAlphabet;
    const letterCounts = [];
    // const text = 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?';
    const textLength = text.length;

    const t1 = performance.now()

    for (let i = 0; i < letters.length; i++) {
      const counter = (text.match(new RegExp(letters[i], 'g')) || []).length;
      const percent = (counter * 100 ) / textLength;
      const percentValue = Number(parseFloat(percent).toFixed(2))
      letterCounts.push({ title: `${percentValue} %`, letter: letters[i], value: percentValue, color: this.getRandomColor() })
    }

    const t2 = performance.now()
    this.setState({letterCounts});
    console.log('👉 ', `time is ${t2-t1} ms`);
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  componentDidMount() {
    this.createLettersCounterObject();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text !== this.props.text) {
      this.createLettersCounterObject();
    }
  }

  render() {
    const { letterCounts } = this.state;

    const defaultLabelStyle = {
      fontSize: '6px',
      fontFamily: 'sans-serif',
      // fill: '#ffffff',
    };

    return (
      <div>
        <PieChart
          viewBoxSize={[120, 120]}
          center={[60, 60]}
          data={letterCounts}
          style={{ width: '500px', height: '400px'}}
          label={({ dataEntry }) => `${dataEntry.letter}`}
          labelPosition={110}
          animate={false}
          labelStyle={{
            ...defaultLabelStyle,
          }}
        />
      </div>
    );
  }
}

TheLettersCounter.propTypes = {
  text: string
};

export default TheLettersCounter;

