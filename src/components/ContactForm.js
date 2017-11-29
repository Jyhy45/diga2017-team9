var DonationBox = React.createClass({
	getInitialState: function () {
		//this will hold all the data being read and posted to the file
		return { data: [] };
	},
	loadDonationsFromServer: function () {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	componentDidMount: function () {
		this.loadDonationsFromServer();
		setInterval(this.loadDonationsFromServer, this.props.pollInterval);
	},
	handleDonationSubmit: function (donation) {
		//this is just an example of how you would submit a form
		//you would have to implement something separately on the server
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			type: 'POST',
			data: donation,
			success: function (data) {
				this.setState({ data: data });
			}.bind(this),
			error: function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	render: function () {
		return (
			<div className="donationBox">
				<h1>Donations</h1>
				<DonationList data={this.state.data} />
				<DonationForm onDonationSubmit={this.handleDonationSubmit} />
			</div>
		);
	}
});

ReactDOM.render(
	<DonationBox url="/api/donations" pollInterval={2000} />,
	document.getElementById('content')
);