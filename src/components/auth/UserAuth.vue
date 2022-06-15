<template>
  <div>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="An error occured"
      >{{ error }}</base-dialog
    >
    <base-dialog :show="isLoading" fixed title="Authenticating..."
      ><base-spinner> </base-spinner>
    </base-dialog>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <p v-if="!formIsValid">Please valid email and password!</p>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <button>{{ submitButtonCaption }}</button>
        <button type="button" mode="flat" @click="switchAuth">
          {{ switchButtonCaption }}
        </button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },
    switchButtonCaption() {
      if (this.mode === 'login') {
        return 'Signupinstead';
      } else {
        return 'Logininstead';
      }
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 5
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('auth/signup', {
            email: this.email,
            password: this.password,
          });
        }
      } catch (err) {
        this.error = err.message;
        console.log(this.error);
      }
      this.isLoading = false;
    },
    switchAuth() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>
