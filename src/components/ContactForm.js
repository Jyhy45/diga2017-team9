
import React, { Component } from 'react'
import './ContactForm.css';

class ContactForm extends Component {

	constructor() {
		super();
		this.state = {
			form: {
				email: '',
				subject: '',
				body: '',
			},
			message: ''
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);
	}

	changeHandler(e) {
		e.persist();
		let store = this.state;
		store.form[e.target.name] = e.target.value;
		store.message = "mailto:ronanlobyrne@gmail.com?subject="+e.target.value.subject+"&body="+e.target.value.email+"%20"+e.target.value.body;
		this.setState(store);
	}

	submitHandler(e) {
		e.preventDefault();
		//console.log(this.state.form);
		fetch('', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			data: JSON.stringify(this.state.form)
		});
	}

	render() {
		const { form, message } = this.state;
		return (
			<div className="Container">
				<form onSubmit={this.submitHandler} href={message}>
					<table>
						<tbody>
							<tr>
								<td>
									<label htmlFor="email" className="contactLabel">Email</label>
								</td>
								<td>
									<input className="contactInput" type="email" name="email" value={form.email} onChange={this.changeHandler} placeholder="Your Email Here" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="subject" className="contactLabel">Subject</label>
								</td>
								<td>
									<input className="contactInput" type="text" name="subject" value={form.subject} onChange={this.changeHandler} placeholder="Your Subject Here" />
								</td>
							</tr>
							<tr>
								<td>
									<label htmlFor="body" className="contactLabel">Message</label>
								</td>
								<td>
									<textarea className="contactTextarea" cols="22" rows="4" name="body" value={form.body} onChange={this.changeHandler} placeholder="Your Message Here" ></textarea>
								</td >
							</tr >
							<tr>
								<td colSpan="2">
									<input className="contactSubmit" type="submit" value="Submit"/>
								</td >
							</tr >
						</tbody>
					</table>
				</form>
			</div>
		);
	}
}

export default ContactForm;