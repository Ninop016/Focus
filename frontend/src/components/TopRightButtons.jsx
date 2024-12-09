// src/components/TopRightButtons.jsx
function TopRightButtons({ darkMode, toggleDarkMode }) {
    const writeReview = () => {
      const review = window.prompt('Please write your review:');
      if (review) {
        // Handle the review (e.g., send to server or display)
        console.log('User review:', review);
        alert('Thank you for your review!');
      }
    };
  
    return (
      <div className="top-right-buttons">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
        </button>
        <button onClick={writeReview}>Write a Review</button>
      </div>
    );
  }
  
  export default TopRightButtons;