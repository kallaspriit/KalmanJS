function LinearKalmanFilter(
	stateTransitionMatrix,		// A
	controlMatrix,				// B
	observationMatrix,			// H
	initialStateEstimate,		// X
	initialCovarianceEstimate,	// P
	processErrorEstimate,		// Q
	measurementErrorEstimate	// R
) {
	this.stateTransitionMatrix = stateTransitionMatrix;
	this.controlMatrix = controlMatrix;
	this.observationMatrix = observationMatrix;
	this.stateEstimate = initialStateEstimate;
	this.covarianceEstimate = initialCovarianceEstimate;
	this.processErrorEstimate = processErrorEstimate;
	this.measurementErrorEstimate = measurementErrorEstimate;

	this.predictedStateEstimate = null;
	this.predictedProbabilityEstimate = null;
	this.innovation = null;
	this.innovationCovariance = null;
	this.kalmanGain = null;
}

LinearKalmanFilter.prototype.getStateEstimate = function() {
	return this.stateEstimate;
};

LinearKalmanFilter.prototype.predict = function(controlVector) {
	this.predictedStateEstimate = this.stateTransitionMatrix
			.multiply(this.stateEstimate)
			.add(this.controlMatrix.multiply(controlVector));

	this.predictedProbabilityEstimate = this.stateTransitionMatrix
		.multiply(this.covarianceEstimate)
		.multiply(this.stateTransitionMatrix.transpose())
		.add(this.processErrorEstimate);
};

LinearKalmanFilter.prototype.observe = function(measurementVector) {
	if (measurementVector !== null) {
		this.innovation = measurementVector
				.substract(this.observationMatrix.multiply(this.predictedStateEstimate));

		this.innovationCovariance = this.observationMatrix
			.multiply(this.predictedProbabilityEstimate)
			.multiply(this.observationMatrix.transpose())
			.add(this.measurementErrorEstimate);
	} else {
		this.innovation = this.stateTransitionMatrix.zero();
	}
};

LinearKalmanFilter.prototype.update = function() {
	this.kalmanGain = this.predictedProbabilityEstimate
		.multiply(this.observationMatrix.transpose())
		.multiply(this.innovationCovariance.inverse());

	this.stateEstimate = this.predictedStateEstimate
			.add(this.kalmanGain.multiply(this.innovation));

	this.covarianceEstimate = this.covarianceEstimate.identity()
			.substract(this.kalmanGain.multiply(this.observationMatrix))
			.multiply(this.predictedProbabilityEstimate);
};