/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'red' : '#C5251C',
      'red2' : '#d73e2e',
      'red3' : '#C7281E',
      'red4' : '#D13628',
      'red5' : '#D13628',
      'white' : '#fff',
      'white2' : '#FFFFFF',
      'black' : '#2C2C2C',
      'black2' : '#333333',
      'black3' : '#000000',
      'gray' : '#E7E7E7',
      'gray2' : '#4f4f4f',
      'green' : '#8BC837',
      'red6' : '#AF2219',
      'red7' : '#C21B17',
      'gray3' : '#BABABA',
      'white3' : '#F8F8F8',
      'white4' : 'EEEEEE',
      },
      extend: {
        fontFamily :{
          'sans' :['Montserrat','sans-serif'],
        },
        fontSize:{
          '22.8' :'22.8px',
          '22' : '22px',
        },
  
      },
  },
  plugins: [],
}

