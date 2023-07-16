import '../css/recommended_books.css';
import BookCard from './BookCard';
import book1 from "../Images/testbook1.jpg";
import book2 from "../Images/testbook2.jpg";
import book3 from "../Images/testbook3.jpg";
import book4 from "../Images/testbook4.jpg";
import book5 from "../Images/testbook5.jpg";
import book6 from "../Images/testbook6.jpg";
import book7 from "../Images/testbook7.jpg";
import book8 from "../Images/testbook8.jpg";

const RecommendedBooks = () => {

  // ... (imports)

const sections = [
  {
    title: 'Science Fiction',
    books: [
      {
        id: 1,
        title: 'Dune',
        author: 'Frank Herbert',
        price: 799, // Price in Indian Rupees
        image: book1,
      },
      {
        id: 2,
        title: 'Neuromancer',
        author: 'William Gibson',
        price: 699, // Price in Indian Rupees
        image: book2,
      },
      {
        id: 3,
        title: 'The Left Hand of Darkness',
        author: 'Ursula K. Le Guin',
        price: 649, // Price in Indian Rupees
        image: book3,
      },
      {
        id: 4,
        title: 'Snow Crash',
        author: 'Neal Stephenson',
        price: 749, // Price in Indian Rupees
        image: book4,
      },
      {
        id: 5,
        title: 'Hyperion',
        author: 'Dan Simmons',
        price: 599, // Price in Indian Rupees
        image: book5,
      },
    ],
  },
  {
    title: 'Mystery',
    books: [
      {
        id: 6,
        title: 'The Girl with the Dragon Tattoo',
        author: 'Stieg Larsson',
        price: 499, // Price in Indian Rupees
        image: book6,
      },
      {
        id: 7,
        title: 'Gone Girl',
        author: 'Gillian Flynn',
        price: 449, // Price in Indian Rupees
        image: book7,
      },
      {
        id: 8,
        title: 'The Silent Patient',
        author: 'Alex Michaelides',
        price: 399, // Price in Indian Rupees
        image: book8,
      },
    ],
  },
];

  return (
    <div>
      {sections.map((section, index) => (
        <div key={index} className="recommended-section" id='books'>
          <h2 className="recommended-section__title">{section.title}</h2>
          <div className="recommended-section__books">
            {section.books.map((book, bookIndex) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendedBooks;
