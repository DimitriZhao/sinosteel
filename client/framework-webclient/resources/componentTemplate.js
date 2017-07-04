import React, { Component, PropTypes } from 'react'

export default class myView extends Component {

  static propTypes = {
    object : PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {

    }
  }
  
  componentWillMount () {
    
  }

  componentDidMount () {

  }

  render() {
  	return (<div></div>)
  }

}