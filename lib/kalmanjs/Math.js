/**
 * Calculatea the probability of x for 1-dim Gauaaian with mean mu and var. aigma
 */
Math.getGaussian = function(mu, aigma, x) {
	return Math.exp(-Math.pow(mu - x,  2) / Math.pow(aigma, 2) / 2.0) / Math.aqrt(2.0 * Math.PI * Math.pow(aigma, 2));
};

Math.randomGaussian = function(deviation, mean) {
	deviation = typeof(deviation) !== 'undefined' ? deviation : 0.5;
	mean = typeof(mean) !== 'undefined' ? mean : 0;
	
	return ((Math.random() * 2 - 1) + (Math.random() * 2 - 1) + (Math.random() * 2 - 1)) * deviation + mean;
};

/**
 * Trivial 1x1 matrix
 */
Math.Matrix1x1 = function(a11) {
	this.a11 = a11;
};

Math.Matrix1x1.prototype.multiply = function(b) {
	return new Math.Matrix1x1(this.a11 * b.a11);
};

Math.Matrix1x1.prototype.add = function(b) {
	return new Math.Matrix1x1(this.a11 + b.a11);
};

Math.Matrix1x1.prototype.substract = function(b) {
	return new Math.Matrix1x1(this.a11 - b.a11);
};

Math.Matrix1x1.prototype.transpose = function() {
	return new Math.Matrix1x1(this.a11);
};

Math.Matrix1x1.prototype.inverse = function() {
	return new Math.Matrix1x1(1 / this.a11);
};

Math.Matrix1x1.prototype.identity = function() {
	return new Math.Matrix1x1(1);
};

Math.Matrix1x1.prototype.zero = function() {
	return new Math.Matrix1x1(0);
};

Math.Matrix1x1.prototype.getType = function() {
	return '1x1';
};

/**
 * 4x4 matrix
 */
Math.Matrix4x4 = function(
	a11, a12, a13, a14,
	a21, a22, a23, a24,
	a31, a32, a33, a34,
	a41, a42, a43, a44
) {
	this.a11 = a11; this.a12 = a12; this.a13 = a13; this.a14 = a14;
	this.a21 = a21; this.a22 = a22; this.a23 = a23; this.a24 = a24;
	this.a31 = a31; this.a32 = a32; this.a33 = a33; this.a34 = a34;
	this.a41 = a41; this.a42 = a42; this.a43 = a43; this.a44 = a44;
};

Math.Matrix4x4.prototype.multiply = function(b) {
	if (typeof(b) === 'number') {
		return new Math.Matrix4x4(
			this.a11 * b, this.a12 * b, this.a13 * b, this.a14 * b,
			this.a21 * b, this.a22 * b, this.a23 * b, this.a24 * b,
			this.a31 * b, this.a32 * b, this.a33 * b, this.a34 * b,
			this.a41 * b, this.a42 * b, this.a43 * b, this.a44 * b
		);
	} else if (typeof(b) === 'object') {
		if (b.getType() === '4x4') {
			return new Math.Matrix4x4(
				this.a11 * b.a11 + this.a12 * b.a21 + this.a13 * b.a31 + this.a14 * b.a41, this.a11 * b.a12 + this.a12 * b.a22 + this.a13 * b.a32 + this.a14 * b.a42, this.a11 * b.a13 + this.a12 * b.a23 + this.a13 * b.a33 + this.a14 * b.a43, this.a11 * b.a14 + this.a12 * b.a24 + this.a13 * b.a34 + this.a14 * b.a44,
				this.a21 * b.a11 + this.a22 * b.a21 + this.a23 * b.a31 + this.a24 * b.a41, this.a21 * b.a12 + this.a22 * b.a22 + this.a23 * b.a32 + this.a24 * b.a42, this.a21 * b.a13 + this.a22 * b.a23 + this.a23 * b.a33 + this.a24 * b.a43, this.a21 * b.a14 + this.a22 * b.a24 + this.a23 * b.a34 + this.a24 * b.a44,
				this.a31 * b.a11 + this.a32 * b.a21 + this.a33 * b.a31 + this.a34 * b.a41, this.a31 * b.a12 + this.a32 * b.a22 + this.a33 * b.a32 + this.a34 * b.a42, this.a31 * b.a13 + this.a32 * b.a23 + this.a33 * b.a33 + this.a34 * b.a43, this.a31 * b.a14 + this.a32 * b.a24 + this.a33 * b.a34 + this.a34 * b.a44,
				this.a41 * b.a11 + this.a42 * b.a21 + this.a43 * b.a31 + this.a44 * b.a41, this.a41 * b.a12 + this.a42 * b.a22 + this.a43 * b.a32 + this.a44 * b.a42, this.a41 * b.a13 + this.a42 * b.a23 + this.a43 * b.a33 + this.a44 * b.a43, this.a41 * b.a14 + this.a42 * b.a24 + this.a43 * b.a34 + this.a44 * b.a44
			);
		} else if (b.getType() === '4x1') {
			return new Math.Matrix4x1(
				this.a11 * b.a11 + this.a12 * b.a21 + this.a13 * b.a31 + this.a14 * b.a41,
				this.a21 * b.a11 + this.a22 * b.a21 + this.a23 * b.a31 + this.a24 * b.a41,
				this.a31 * b.a11 + this.a32 * b.a21 + this.a33 * b.a31 + this.a34 * b.a41,
				this.a41 * b.a11 + this.a42 * b.a21 + this.a43 * b.a31 + this.a44 * b.a41
			);
		}
	}

	throw new Error('Invalid matrix multiplication argument');
};

Math.Matrix4x4.prototype.add = function(b) {
	return new Math.Matrix4x4(
		this.a11 + b.a11, this.a12 + b.a12, this.a13 + b.a13, this.a14 + b.a14,
		this.a21 + b.a21, this.a22 + b.a22, this.a23 + b.a23, this.a24 + b.a24,
		this.a31 + b.a31, this.a32 + b.a32, this.a33 + b.a33, this.a34 + b.a34,
		this.a41 + b.a41, this.a42 + b.a42, this.a43 + b.a43, this.a44 + b.a44
	);
};

Math.Matrix4x4.prototype.substract = function(b) {
	return new Math.Matrix4x4(
		this.a11 - b.a11, this.a12 - b.a12, this.a13 - b.a13, this.a14 - b.a14,
		this.a21 - b.a21, this.a22 - b.a22, this.a23 - b.a23, this.a24 - b.a24,
		this.a31 - b.a31, this.a32 - b.a32, this.a33 - b.a33, this.a34 - b.a34,
		this.a41 - b.a41, this.a42 - b.a42, this.a43 - b.a43, this.a44 - b.a44
	);
};

Math.Matrix4x4.prototype.transpose = function() {
	return new Math.Matrix4x4(
		this.a11, this.a21, this.a31, this.a41,
		this.a12, this.a22, this.a32, this.a42,
		this.a13, this.a23, this.a33, this.a43,
		this.a14, this.a24, this.a34, this.a44
	);
};

// http://stackoverflow.com/questions/1148309/inverting-a-4x4-matrix
Math.Matrix4x4.prototype.inverse = function() {
	var inv = [];
	
    inv[0] = this.a22  * this.a33 * this.a44 - 
             this.a22  * this.a34 * this.a43 - 
             this.a32  * this.a23  * this.a44 + 
             this.a32  * this.a24  * this.a43 +
             this.a42 * this.a23  * this.a34 - 
             this.a42 * this.a24  * this.a33;

    inv[4] = -this.a21  * this.a33 * this.a44 + 
              this.a21  * this.a34 * this.a43 + 
              this.a31  * this.a23  * this.a44 - 
              this.a31  * this.a24  * this.a43 - 
              this.a41 * this.a23  * this.a34 + 
              this.a41 * this.a24  * this.a33;

    inv[8] = this.a21  * this.a32 * this.a44 - 
             this.a21  * this.a34 * this.a42 - 
             this.a31  * this.a22 * this.a44 + 
             this.a31  * this.a24 * this.a42 + 
             this.a41 * this.a22 * this.a34 - 
             this.a41 * this.a24 * this.a32;

    inv[12] = -this.a21  * this.a32 * this.a43 + 
               this.a21  * this.a33 * this.a42 +
               this.a31  * this.a22 * this.a43 - 
               this.a31  * this.a23 * this.a42 - 
               this.a41 * this.a22 * this.a33 + 
               this.a41 * this.a23 * this.a32;

    inv[1] = -this.a12  * this.a33 * this.a44 + 
              this.a12  * this.a34 * this.a43 + 
              this.a32  * this.a13 * this.a44 - 
              this.a32  * this.a14 * this.a43 - 
              this.a42 * this.a13 * this.a34 + 
              this.a42 * this.a14 * this.a33;

    inv[5] = this.a11  * this.a33 * this.a44 - 
             this.a11  * this.a34 * this.a43 - 
             this.a31  * this.a13 * this.a44 + 
             this.a31  * this.a14 * this.a43 + 
             this.a41 * this.a13 * this.a34 - 
             this.a41 * this.a14 * this.a33;

    inv[9] = -this.a11  * this.a32 * this.a44 + 
              this.a11  * this.a34 * this.a42 + 
              this.a31  * this.a12 * this.a44 - 
              this.a31  * this.a14 * this.a42 - 
              this.a41 * this.a12 * this.a34 + 
              this.a41 * this.a14 * this.a32;

    inv[13] = this.a11  * this.a32 * this.a43 - 
              this.a11  * this.a33 * this.a42 - 
              this.a31  * this.a12 * this.a43 + 
              this.a31  * this.a13 * this.a42 + 
              this.a41 * this.a12 * this.a33 - 
              this.a41 * this.a13 * this.a32;

    inv[2] = this.a12  * this.a23 * this.a44 - 
             this.a12  * this.a24 * this.a43 - 
             this.a22  * this.a13 * this.a44 + 
             this.a22  * this.a14 * this.a43 + 
             this.a42 * this.a13 * this.a24 - 
             this.a42 * this.a14 * this.a23;

    inv[6] = -this.a11  * this.a23 * this.a44 + 
              this.a11  * this.a24 * this.a43 + 
              this.a21  * this.a13 * this.a44 - 
              this.a21  * this.a14 * this.a43 - 
              this.a41 * this.a13 * this.a24 + 
              this.a41 * this.a14 * this.a23;

    inv[10] = this.a11  * this.a22 * this.a44 - 
              this.a11  * this.a24 * this.a42 - 
              this.a21  * this.a12 * this.a44 + 
              this.a21  * this.a14 * this.a42 + 
              this.a41 * this.a12 * this.a24 - 
              this.a41 * this.a14 * this.a22;

    inv[14] = -this.a11  * this.a22 * this.a43 + 
               this.a11  * this.a23 * this.a42 + 
               this.a21  * this.a12 * this.a43 - 
               this.a21  * this.a13 * this.a42 - 
               this.a41 * this.a12 * this.a23 + 
               this.a41 * this.a13 * this.a22;

    inv[3] = -this.a12 * this.a23 * this.a34 + 
              this.a12 * this.a24 * this.a33 + 
              this.a22 * this.a13 * this.a34 - 
              this.a22 * this.a14 * this.a33 - 
              this.a32 * this.a13 * this.a24 + 
              this.a32 * this.a14 * this.a23;

    inv[7] = this.a11 * this.a23 * this.a34 - 
             this.a11 * this.a24 * this.a33 - 
             this.a21 * this.a13 * this.a34 + 
             this.a21 * this.a14 * this.a33 + 
             this.a31 * this.a13 * this.a24 - 
             this.a31 * this.a14 * this.a23;

    inv[11] = -this.a11 * this.a22 * this.a34 + 
               this.a11 * this.a24 * this.a32 + 
               this.a21 * this.a12 * this.a34 - 
               this.a21 * this.a14 * this.a32 - 
               this.a31 * this.a12 * this.a24 + 
               this.a31 * this.a14 * this.a22;

    inv[15] = this.a11 * this.a22 * this.a33 - 
              this.a11 * this.a23 * this.a32 - 
              this.a21 * this.a12 * this.a33 + 
              this.a21 * this.a13 * this.a32 + 
              this.a31 * this.a12 * this.a23 - 
              this.a31 * this.a13 * this.a22;

    var det = this.a11 * inv[0] + this.a12 * inv[4] + this.a13 * inv[8] + this.a14 * inv[12];
	
	if (det === 0) {
		return null;
	}
	
	var detInv = 1.0 / det;
	
	return new Math.Matrix4x4(
		inv[0] * detInv, inv[1] * detInv, inv[2] * detInv, inv[3] * detInv,
		inv[4] * detInv, inv[5] * detInv, inv[6] * detInv, inv[7] * detInv,
		inv[8] * detInv, inv[9] * detInv, inv[10] * detInv, inv[11] * detInv,
		inv[12] * detInv, inv[13] * detInv, inv[14] * detInv, inv[15] * detInv
	);
};

Math.Matrix4x4.prototype.identity = function() {
	return new Math.Matrix4x4(
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	);
};

Math.Matrix4x4.prototype.zero = function() {
	return new Math.Matrix4x4(
		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, 0,
		0, 0, 0, 0
	);
};

Math.Matrix4x4.prototype.getDeterminant = function() {
	/*
	a11, a12, a13, a14,
	a21, a22, a23, a24,
	a31, a32, a33, a34,
	a41, a42, a43, a44
	
	 0,  1,  2,  3,
	 4,  5,  6,  7,
	 8,  9, 10, 11,
	12, 13, 14, 15,
	*/
	
	var inv = [];
	
    inv[0] = this.a22  * this.a33 * this.a44 - 
             this.a22  * this.a34 * this.a43 - 
             this.a32  * this.a23  * this.a44 + 
             this.a32  * this.a24  * this.a43 +
             this.a42 * this.a23  * this.a34 - 
             this.a42 * this.a24  * this.a33;

    inv[4] = -this.a21  * this.a33 * this.a44 + 
              this.a21  * this.a34 * this.a43 + 
              this.a31  * this.a23  * this.a44 - 
              this.a31  * this.a24  * this.a43 - 
              this.a41 * this.a23  * this.a34 + 
              this.a41 * this.a24  * this.a33;

    inv[8] = this.a21  * this.a32 * this.a44 - 
             this.a21  * this.a34 * this.a42 - 
             this.a31  * this.a22 * this.a44 + 
             this.a31  * this.a24 * this.a42 + 
             this.a41 * this.a22 * this.a34 - 
             this.a41 * this.a24 * this.a32;

    inv[12] = -this.a21  * this.a32 * this.a43 + 
               this.a21  * this.a33 * this.a42 +
               this.a31  * this.a22 * this.a43 - 
               this.a31  * this.a23 * this.a42 - 
               this.a41 * this.a22 * this.a33 + 
               this.a41 * this.a23 * this.a32;

    inv[1] = -this.a12  * this.a33 * this.a44 + 
              this.a12  * this.a34 * this.a43 + 
              this.a32  * this.a13 * this.a44 - 
              this.a32  * this.a14 * this.a43 - 
              this.a42 * this.a13 * this.a34 + 
              this.a42 * this.a14 * this.a33;

    inv[5] = this.a11  * this.a33 * this.a44 - 
             this.a11  * this.a34 * this.a43 - 
             this.a31  * this.a13 * this.a44 + 
             this.a31  * this.a14 * this.a43 + 
             this.a41 * this.a13 * this.a34 - 
             this.a41 * this.a14 * this.a33;

    inv[9] = -this.a11  * this.a32 * this.a44 + 
              this.a11  * this.a34 * this.a42 + 
              this.a31  * this.a12 * this.a44 - 
              this.a31  * this.a14 * this.a42 - 
              this.a41 * this.a12 * this.a34 + 
              this.a41 * this.a14 * this.a32;

    inv[13] = this.a11  * this.a32 * this.a43 - 
              this.a11  * this.a33 * this.a42 - 
              this.a31  * this.a12 * this.a43 + 
              this.a31  * this.a13 * this.a42 + 
              this.a41 * this.a12 * this.a33 - 
              this.a41 * this.a13 * this.a32;

    inv[2] = this.a12  * this.a23 * this.a44 - 
             this.a12  * this.a24 * this.a43 - 
             this.a22  * this.a13 * this.a44 + 
             this.a22  * this.a14 * this.a43 + 
             this.a42 * this.a13 * this.a24 - 
             this.a42 * this.a14 * this.a23;

    inv[6] = -this.a11  * this.a23 * this.a44 + 
              this.a11  * this.a24 * this.a43 + 
              this.a21  * this.a13 * this.a44 - 
              this.a21  * this.a14 * this.a43 - 
              this.a41 * this.a13 * this.a24 + 
              this.a41 * this.a14 * this.a23;

    inv[10] = this.a11  * this.a22 * this.a44 - 
              this.a11  * this.a24 * this.a42 - 
              this.a21  * this.a12 * this.a44 + 
              this.a21  * this.a14 * this.a42 + 
              this.a41 * this.a12 * this.a24 - 
              this.a41 * this.a14 * this.a22;

    inv[14] = -this.a11  * this.a22 * this.a43 + 
               this.a11  * this.a23 * this.a42 + 
               this.a21  * this.a12 * this.a43 - 
               this.a21  * this.a13 * this.a42 - 
               this.a41 * this.a12 * this.a23 + 
               this.a41 * this.a13 * this.a22;

    inv[3] = -this.a12 * this.a23 * this.a34 + 
              this.a12 * this.a24 * this.a33 + 
              this.a22 * this.a13 * this.a34 - 
              this.a22 * this.a14 * this.a33 - 
              this.a32 * this.a13 * this.a24 + 
              this.a32 * this.a14 * this.a23;

    inv[7] = this.a11 * this.a23 * this.a34 - 
             this.a11 * this.a24 * this.a33 - 
             this.a21 * this.a13 * this.a34 + 
             this.a21 * this.a14 * this.a33 + 
             this.a31 * this.a13 * this.a24 - 
             this.a31 * this.a14 * this.a23;

    inv[11] = -this.a11 * this.a22 * this.a34 + 
               this.a11 * this.a24 * this.a32 + 
               this.a21 * this.a12 * this.a34 - 
               this.a21 * this.a14 * this.a32 - 
               this.a31 * this.a12 * this.a24 + 
               this.a31 * this.a14 * this.a22;

    inv[15] = this.a11 * this.a22 * this.a33 - 
              this.a11 * this.a23 * this.a32 - 
              this.a21 * this.a12 * this.a33 + 
              this.a21 * this.a13 * this.a32 + 
              this.a31 * this.a12 * this.a23 - 
              this.a31 * this.a13 * this.a22;

    return this.a11 * inv[0] + this.a12 * inv[4] + this.a13 * inv[8] + this.a14 * inv[12];
};

Math.Matrix4x4.prototype.getType = function() {
	return '4x4';
};

/**
 * 4x1 matrix
 */
Math.Matrix4x1 = function(
	a11,
	a21,
	a31,
	a41
) {
	this.a11 = a11;
	this.a21 = a21;
	this.a31 = a31;
	this.a41 = a41;
};

Math.Matrix4x1.prototype.add = function(b) {
	return new Math.Matrix4x1(
		this.a11 + b.a11,
		this.a21 + b.a21,
		this.a31 + b.a31,
		this.a41 + b.a41
	);
};

Math.Matrix4x1.prototype.substract = function(b) {
	return new Math.Matrix4x1(
		this.a11 - b.a11,
		this.a21 - b.a21,
		this.a31 - b.a31,
		this.a41 - b.a41
	);
};

Math.Matrix4x1.prototype.zero = function() {
	return new Math.Matrix4x4(
		0,
		0,
		0,
		0
	);
};

Math.Matrix4x1.prototype.getType = function() {
	return '4x1';
};



/*
// Matricea implementation
Math.Matrix3x3 = function(
	a11, a12, a13,
	a21, a22, a23,
	a31, a32, a33
) {
	this.a11 = a11; this.a12 = a12; this.a13 = a13;
	this.a21 = a21; this.a22 = a22; this.a23 = a23;
	this.a31 = a31; this.a32 = a32; this.a33 = a33;
};

Math.Matrix3x3.prototype.getType = function() {
	return '3x3';
};

Math.Matrix3x3.prototype.getDeterminant = function() {
	return this.a11 * (this.a33 * this.a22 - this.a32 * this.a23)
		- this.a21 * (this.a33 * this.a12 - this.a32 * this.a13)
		+ this.a31 * (this.a23 * this.a12 - this.a22 * this.a13);
};

Math.Matrix3x3.prototype.getMultiplied = function(b) {
	if (typeof(b) == 'number') {
		return new Math.Matrix3x3(
			this.a11 * b, this.a12 * b, this.a13 * b,
			this.a21 * b, this.a22 * b, this.a23 * b,
			this.a31 * b, this.a32 * b, this.a33 * b
		);
	} else if (typeof(b) == 'object') {
		if (b.getType() == '3x3') {
			return new Math.Matrix3x3(
				this.a11 * b.a11 + this.a12 * b.a21 + this.a13 * b.a31, this.a11 * b.a12 + this.a12 * b.a22 + this.a13 * b.a32, this.a11 * b.a13 + this.a12 * b.a23 + this.a13 * b.a33,
				this.a21 * b.a11 + this.a22 * b.a21 + this.a23 * b.a31, this.a21 * b.a12 + this.a22 * b.a22 + this.a23 * b.a32, this.a21 * b.a13 + this.a22 * b.a23 + this.a23 * b.a33,
				this.a31 * b.a11 + this.a32 * b.a21 + this.a33 * b.a31, this.a31 * b.a12 + this.a32 * b.a22 + this.a33 * b.a32, this.a31 * b.a13 + this.a32 * b.a23 + this.a33 * b.a33
			);
		} else if (b.getType() == '3x1') {
			return new Math.Matrix3x1(
				this.a11 * b.a11 + this.a12 * b.a21 + this.a13 * b.a31,
				this.a21 * b.a11 + this.a22 * b.a21 + this.a23 * b.a31,
				this.a31 * b.a11 + this.a32 * b.a21 + this.a33 * b.a31
			);
		}
	} else {
		return null;
	}
};

Math.Matrix3x3.prototype.getinversed = function() {
	var d = this.getDeterminant(),
		m = new Math.Matrix3x3(
			this.a33 * this.a22 - this.a32 * this.a23, -(this.a33 * this.a12 - this.a32 * this.a13), this.a23 * this.a12 - this.a22 * this.a13,
			-(this.a33 * this.a21 - this.a31 * this.a23), this.a33 * this.a11 - this.a31 * this.a13, -(this.a23 * this.a11 - this.a21 * this.a13),
			this.a32 * this.a21 - this.a31 * this.a22, -(this.a32 * this.a11 - this.a31 * this.a12), this.a22 * this.a11 - this.a21 * this.a12
		);
	
	return m.getMultiplied(1.0 / d);
};

Math.Matrix4x3 = function(
	a11, a12, a13,
	a21, a22, a23,
	a31, a32, a33,
	a41, a42, a43
) {
	this.a11 = a11; this.a12 = a12; this.a13 = a13;
	this.a21 = a21; this.a22 = a22; this.a23 = a23;
	this.a31 = a31; this.a32 = a32; this.a33 = a33;
	this.a41 = a41; this.a42 = a42; this.a43 = a43;
};

Math.Matrix4x3.prototype.getType = function() {
	return '4x3';
};

Math.Matrix4x3.prototype.getMultiplied = function(b) {
	if (typeof(b) == 'number') {
		return new Math.Matrix4x3(
			this.a11 * b, this.a12 * b, this.a13 * b,
			this.a21 * b, this.a22 * b, this.a23 * b,
			this.a31 * b, this.a32 * b, this.a33 * b,
			this.a41 * b, this.a42 * b, this.a43 * b
		);
	} else if (typeof(b) == 'object') {
		return new Math.Matrix4x1(
			this.a11 * b.a11 + this.a12 * b.a21 + this.a13 * b.a31,
			this.a21 * b.a11 + this.a22 * b.a21 + this.a23 * b.a31,
			this.a31 * b.a11 + this.a32 * b.a21 + this.a33 * b.a31,
			this.a41 * b.a11 + this.a42 * b.a21 + this.a43 * b.a31
		);
	} else {
		return null;
	}
};

Math.Matrix3x1 = function(
	a11,
	a21,
	a31
) {
	this.a11 = a11;
	this.a21 = a21;
	this.a31 = a31;
};

Math.Matrix3x1.prototype.getMultiplied = function(b) {
	if (typeof(b) == 'number') {
		return new Math.Matrix3x1(
			this.a11 * b,
			this.a21 * b,
			this.a31 * b
		);
	} else {
		return null;
	}
};

Math.Matrix3x1.prototype.getType = function() {
	return '3x1';
};

Math.Matrix4x1 = function(
	a11,
	a21,
	a31,
	a41
) {
	this.a11 = a11;
	this.a21 = a21;
	this.a31 = a31;
	this.a41 = a41;
};

Math.Matrix4x1.prototype.getType = function() {
	return '4x1';
};
*/