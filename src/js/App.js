import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
// import {reduxForm} from 'redux-form';
import {loadIssues} from './action'

class App extends Component {

  handleClick(e){
  	e.preventDefault()
  	this.props.loadIssues('shtbik')
  }

  render() {
  	var data = this.props.issues

    return (
        <div className='app'>
        	<div className='col col-md-12 col-sm-12'>
        		<form action='' onSubmit={::this.handleClick}>
		        	<h3>Получи список своих репозиториев на GitHub</h3>
		        	<h4>Ваш никнейм:
		        		<input 
			        		type='text'
			        		value=''
		        		/>
		        		<button type='submit'>Загрузить</button>
		        	</h4>
		        	
	        	</form>
	        	
	        	{data.map((issue, i) => 
	        		<div key={i}>
	        			<a href={issue.html_url} target='_blank'>{issue.name}</a>
	        			<p>{issue.description}</p>
	        		</div>
	        	)}
        	</div>
        </div>
    );
  }
}

export default connect(
	(state) => {return {counter: state.counter, issues: state.issues}},
	(dispatch) => bindActionCreators({loadIssues}, dispatch)
)(App)