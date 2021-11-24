export default function yookassaWidget(confirmation_token) {
  return new window.YooMoneyCheckoutWidget({
    confirmation_token,
    return_url: window.location.origin + "/orders",
    customization: {
      colors: {
        // Text color
        text: "#ffffff",
        // Payment form background color
        background: "#1b1d23",
        // Color of borders and separators
        border: "#D4D4D4",
        // Base color of the Pay button and other accent elements
        controlPrimary: "#00BF96",
        // Text color in the Pay button, icon color in radio button and checkbox
        controlPrimaryContent: "#FFFFFF",
        // Color of non-accent interface elements
        controlSecondary: "#AFBDCA",
      },
      //Selection of payment method for display
      // payment_methods: ['bank_card', 'apple_pay', 'google_pay']
    },
    error_callback: function (error) {
      // Processing of initialization errors
      console.error(error);
    },
  });
}
