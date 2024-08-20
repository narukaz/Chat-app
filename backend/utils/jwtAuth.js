import jwt from 'jsonwebtoken';

const jwtAuth = (user, res) => {
  if (!process.env.SECRET_KEY) {
    console.error('SECRET_KEY is not defined');
    return res.status(500).json({ error: true, message: 'Internal server error' });
  }

  try {
    // Create the token
    const token = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '5d' });

    // Set the token in a cookie
    res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    // Optionally set other headers
    // Send a JSON response
    console.log(`Token created for ${user}`);
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error creating token:', error);
    return res.status(500).json({ error: true, message: 'Failed to create token' });
  }
};

export default jwtAuth;
