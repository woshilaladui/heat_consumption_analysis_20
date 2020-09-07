import React, { Component } from 'react'
import { connect } from 'react-redux'
import { action } from './store'
import {
  Table,
} from 'antd'

const { Column } = Table

class Tser extends Component {

  render() {

    fetch("/caiji_v4.1/verification", {
      method: "GET",
      credentials:"include",
    })
        .then((response)=>{
          console.log(response)
        });
    return (
      <>
      </>
    )
  }

}

export default Tser
