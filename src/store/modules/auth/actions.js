export default {
  async login(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKRYbf0VlnwOkftfK2TzLvRzmAgaSy6eg',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error(
        responseData.error.errors[0].message || 'User is not authenticated'
      );
    }
    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKRYbf0VlnwOkftfK2TzLvRzmAgaSy6eg',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    console.log(responseData);

    if (!response.ok) {
      throw new Error(
        responseData.error.errors[0].message || 'User is not authenticated'
      );
    }
    context.commit('setUser', {
      userId: responseData.localId,
      token: responseData.idToken,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
