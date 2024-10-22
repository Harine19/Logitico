io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  // Example of receiving an event from client
  socket.on('onboarding', (data) => {
    console.log('Onboarding data received:', data);
    // You can broadcast data or handle it here
    socket.emit('onboardingResponse', { message: 'User onboarded!' });
  });
});