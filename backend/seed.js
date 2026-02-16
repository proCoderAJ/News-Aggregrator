
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Article = require('./models/Article');

dotenv.config();

const sampleArticles = [
  {
    articleId: 'sample-1',
    title: 'Scientists Discover New Species in Amazon Rainforest',
    description: 'Researchers have identified a previously unknown species of frog in the depths of the Amazon.',
    content: 'A team of biologists working in the Amazon rainforest has made an exciting discovery...',
    source: 'Science Daily',
    author: 'Dr. Jane Smith',
    url: 'https://example.com/article1',
    urlToImage: 'https://images.unsplash.com/photo-1597838816882-4435b1977fbe?w=400',
    publishedAt: new Date('2024-01-15T10:00:00Z'),
    category: 'science'
  },
  {
    articleId: 'sample-2',
    title: 'Tech Giant Announces Revolutionary AI Chip',
    description: 'A major technology company unveils a groundbreaking artificial intelligence processor.',
    content: 'In a surprise announcement today, leading tech company revealed their latest innovation...',
    source: 'Tech News',
    author: 'Michael Johnson',
    url: 'https://example.com/article2',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    publishedAt: new Date('2024-01-14T15:30:00Z'),
    category: 'technology'
  },
  {
    articleId: 'sample-3',
    title: 'Stock Markets Reach All-Time Highs',
    description: 'Global stock markets hit record levels as investors remain optimistic about economic growth.',
    content: 'Stock markets around the world reached unprecedented heights today...',
    source: 'Financial Times',
    author: 'Sarah Williams',
    url: 'https://example.com/article3',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    publishedAt: new Date('2024-01-14T09:00:00Z'),
    category: 'business'
  },
  {
    articleId: 'sample-4',
    title: 'New Study Reveals Benefits of Mediterranean Diet',
    description: 'Research shows significant health improvements from following Mediterranean eating patterns.',
    content: 'A comprehensive study published in a leading medical journal has confirmed...',
    source: 'Health Magazine',
    author: 'Dr. Robert Chen',
    url: 'https://example.com/article4',
    urlToImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    publishedAt: new Date('2024-01-13T14:00:00Z'),
    category: 'health'
  },
  {
    articleId: 'sample-5',
    title: 'Championship Game Ends in Thrilling Overtime Victory',
    description: 'Home team secures championship title in dramatic overtime finish.',
    content: 'In one of the most exciting championship games in recent memory...',
    source: 'Sports Network',
    author: 'Tom Anderson',
    url: 'https://example.com/article5',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    publishedAt: new Date('2024-01-13T20:00:00Z'),
    category: 'sports'
  },
  {
    articleId: 'sample-6',
    title: 'Award-Winning Film Breaks Box Office Records',
    description: 'New movie surpasses expectations, earning record-breaking opening weekend.',
    content: 'The highly anticipated film exceeded all projections this weekend...',
    source: 'Entertainment Weekly',
    author: 'Lisa Martinez',
    url: 'https://example.com/article6',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400',
    publishedAt: new Date('2024-01-12T16:00:00Z'),
    category: 'entertainment'
  },
  {
    articleId: 'sample-7',
    title: 'Climate Summit Reaches Historic Agreement',
    description: 'World leaders commit to ambitious new climate targets at international summit.',
    content: 'After days of intense negotiations, representatives from over 190 countries...',
    source: 'Global News',
    author: 'David Lee',
    url: 'https://example.com/article7',
    urlToImage: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b0?w=400',
    publishedAt: new Date('2024-01-12T11:00:00Z'),
    category: 'general'
  },
  {
    articleId: 'sample-8',
    title: 'Startup Raises $100M in Series B Funding',
    description: 'Fast-growing technology startup secures major funding round from top investors.',
    content: 'A promising tech startup announced today that it has raised $100 million...',
    source: 'Business Insider',
    author: 'Emily Brown',
    url: 'https://example.com/article8',
    urlToImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',
    publishedAt: new Date('2024-01-11T13:00:00Z'),
    category: 'business'
  },
  {
    articleId: 'sample-9',
    title: 'Breakthrough in Quantum Computing Research',
    description: 'Scientists achieve major milestone in quantum computer development.',
    content: 'Researchers at a leading university have made a significant breakthrough...',
    source: 'Science Magazine',
    author: 'Prof. James Wilson',
    url: 'https://example.com/article9',
    urlToImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
    publishedAt: new Date('2024-01-11T08:00:00Z'),
    category: 'technology'
  },
  {
    articleId: 'sample-10',
    title: 'Mental Health Awareness Campaign Launches Nationwide',
    description: 'New initiative aims to reduce stigma and improve access to mental health services.',
    content: 'A major mental health organization has launched a nationwide campaign...',
    source: 'Health Today',
    author: 'Dr. Amanda White',
    url: 'https://example.com/article10',
    urlToImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400',
    publishedAt: new Date('2024-01-10T12:00:00Z'),
    category: 'health'
  }
];

async function seedDatabase() {
  try {
  
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    const deleteResult = await Article.deleteMany({});
    console.log(`🗑️  Cleared ${deleteResult.deletedCount} existing articles`);

    const result = await Article.insertMany(sampleArticles);
    console.log(`✅ Inserted ${result.length} sample articles`);

    console.log('\n📊 Sample Articles by Category:');
    const categories = await Article.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} articles`);
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('🚀 You can now start the server and view articles\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
  } finally {
   
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

seedDatabase();
