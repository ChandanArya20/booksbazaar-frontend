import BookCard from './BookCard';
import '../css/recommended_books.css';
import book1 from "../Images/testbook1.jpg";
import book2 from "../Images/testbook2.jpg";
import book3 from "../Images/testbook3.jpg";
import book4 from "../Images/testbook4.jpg";
import book5 from "../Images/testbook5.jpg";
import book6 from "../Images/testbook6.jpg";
import book7 from "../Images/testbook7.jpg";
import book8 from "../Images/testbook8.jpg";
const RecommendedBooks = () => {
  const sections = [
    {
      title: 'Science Fiction',
      books: [
        {
          title: 'Book 1',
          author: 'Author 1',
          price: '$19.99',
          image: book1,
        },
        {
          title: 'Book 2',
          author: 'Author 2',
          price: '$14.99',
          image: book2,
        },
        {
          title: 'Book 3',
          author: 'Author 3',
          price: '$19.99',
          image: book3,
        },
        {
          title: 'Book 4',
          author: 'Author 4',
          price: '$14.99',
          image: book4,
        },
        {
          title: 'Book 5',
          author: 'Author 5',
          price: '$19.99',
          image: book5,
        },
       
        // Add more books for Science Fiction
      ],
    },
    {
      title: 'Mystery',
      books: [
        {
          title: 'Book 6',
          author: 'Author 6',
          price: '$14.99',
          image: book6,
        },
        {
          title: 'Book 7',
          author: 'Author 7',
          price: '$14.99',
          image: book7,
        },
        {
          title: 'Book 8',
          author: 'Author 8',
          price: '$14.99',
          image: book8,
        },
        {
          title: 'Book 7',
          author: 'Author 7',
          price: '$14.99',
          image: book7,
        },
        {
          title: 'Book 6',
          author: 'Author 6',
          price: '$14.99',
          image: book6,
        },
    
  
        
        // Add more books for Mystery
      ],
    },
    // Add more sections here
  ];

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className="recommended-section" id='books'>
          <h2 className="recommended-section__title">{section.title}</h2>
          <div className="recommended-section__books">
            {section.books.map((book, bookIndex) => (
              <BookCard key={bookIndex} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedBooks;
