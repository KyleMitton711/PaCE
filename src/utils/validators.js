export const uniqueUser = async value =>
  value ? value.match(/^[\w.-]+$/i) : true;
export const validPassword = async (value) =>
  value
    ? value.match(/^(?=.*[\d])(?=.*[A-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{0,32}$/)
    : true;
export const validSubdomain = async value =>
  value ? value.match(/^[a-zA-Z0-9-]+$/i) : true;
export const validEmail = async value =>
  value ? value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/) : true;
export const validNumber = async value => (value ? !isNaN(value) : true);
export const validNumberInput = async value => (value ? !isNaN(value) && parseFloat(value) > 0 : true);
export const validUserPassword = async value =>
  value
    ? /\d/.test(value) && /[A-Z]/.test(value)
    : true;