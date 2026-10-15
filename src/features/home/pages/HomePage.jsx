import {
  BookOutlined,
  HeartOutlined,
  ReadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Card, Input, Tag } from 'antd'
import Header from '../../../components/Header.jsx'
import './HomePage.css'

function HomePage() {
  return (
    <main className="home-page">
      <Header />

      <section className="hero-section">
        <div className="hero-copy">
          <Tag color="gold">YOUR NEXT GREAT READ</Tag>
          <h1>Stories worth<br /><em>staying up for.</em></h1>
          <p>Find your next favorite book, keep track of what you are reading, and share the stories that stay with you.</p>
          <Input.Search
            className="book-search"
            size="large"
            placeholder="Search by title, author, or ISBN"
            enterButton={<Button type="primary" icon={<SearchOutlined />}>Search</Button>}
          />
          <div className="hero-links">
            <span><ReadOutlined /> 12,000+ books to explore</span>
            <span><HeartOutlined /> Curated for curious readers</span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="sun-disc" />
          <div className="book-stack book-stack-back" />
          <div className="book-stack book-stack-middle" />
          <div className="book-stack book-stack-front"><BookOutlined /></div>
          <span className="floating-note note-one">read more</span>
          <span className="floating-note note-two">slow mornings</span>
        </div>
      </section>

      <section className="explore-section" id="categories">
        <div className="section-heading">
          <div><span className="eyebrow">A little inspiration</span><h2>Explore your next chapter</h2></div>
          <a href="#categories">View all categories <span aria-hidden="true">→</span></a>
        </div>
        <div className="category-grid">
          {['Fiction', 'Non-fiction', 'Mystery & thriller', 'Romance'].map((category) => (
            <Card key={category} className="category-card" variant="borderless">
              <BookOutlined />
              <h3>{category}</h3>
              <span>Explore collection →</span>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}

export default HomePage
