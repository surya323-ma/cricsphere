// backend/seed.js - Seed database with sample data

const mongoose = require('mongoose');
require('dotenv').config();

const Match = require('./models/Match');
const Player = require('./models/Player');
const News = require('./models/News');
const Admin = require('./models/Admin');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cricsphere';

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Match.deleteMany({});
    await Player.deleteMany({});
    await News.deleteMany({});
    await Admin.deleteMany({});
    console.log('✓ Cleared existing data');

    // Seed Admin
    const admin = new Admin({
      name: 'Super Admin',
      email: 'admin@cricsphere.com',
      password: 'admin123',
      role: 'super_admin'
    });
    await admin.save();
    console.log('✓ Admin created: admin@cricsphere.com / admin123');

    // Seed Matches
    const matches = await Match.insertMany([
      {
        title: 'India vs Australia',
        format: 'ODI',
        team1: 'India',
        team2: 'Australia',
        venue: 'MCG, Melbourne',
        startDate: new Date(),
        status: 'Live',
        team1Score: { runs: 145, wickets: 3, overs: '28.4' }
      },
      {
        title: 'England vs Pakistan',
        format: 'T20',
        team1: 'England',
        team2: 'Pakistan',
        venue: "Lord's, London",
        startDate: new Date(Date.now() + 86400000),
        status: 'Upcoming'
      },
      {
        title: 'South Africa vs New Zealand',
        format: 'Test',
        team1: 'South Africa',
        team2: 'New Zealand',
        venue: 'Newlands, Cape Town',
        startDate: new Date(Date.now() - 172800000),
        status: 'Completed',
        result: 'South Africa won by 45 runs'
      }
    ]);
    console.log(`✓ ${matches.length} matches created`);

    // Seed Players
    const players = await Player.insertMany([
      {
        name: 'Virat Kohli',
        country: 'India',
        role: 'Batsman',
        jersey: 18,
        stats: {
          test: { matches: 105, runs: 8652, avg: 50.3 },
          odi: { matches: 274, runs: 13848, avg: 59.3 },
          t20: { matches: 115, runs: 3795, avg: 41.9 }
        }
      },
      {
        name: 'Jasprit Bumrah',
        country: 'India',
        role: 'Bowler',
        jersey: 93,
        stats: {
          test: { matches: 35, wickets: 123, avg: 22.5 },
          odi: { matches: 94, wickets: 121, avg: 23.1 },
          t20: { matches: 63, wickets: 85, avg: 21.3 }
        }
      },
      {
        name: 'Babar Azam',
        country: 'Pakistan',
        role: 'Batsman',
        jersey: 56,
        stats: {
          test: { matches: 58, runs: 4521, avg: 45.2 },
          odi: { matches: 132, runs: 6341, avg: 53.2 },
          t20: { matches: 89, runs: 2820, avg: 38.1 }
        }
      },
      {
        name: 'Pat Cummins',
        country: 'Australia',
        role: 'Bowler',
        jersey: 30,
        stats: {
          test: { matches: 62, wickets: 268, avg: 21.9 },
          odi: { matches: 85, wickets: 145, avg: 24.5 },
          t20: { matches: 45, wickets: 55, avg: 23.1 }
        }
      }
    ]);
    console.log(`✓ ${players.length} players created`);

    // Seed News
    const news = await News.insertMany([
      {
        title: 'India Wins Historic ODI Series Against Australia',
        excerpt: 'In a thrilling series finale, India clinched the ODI series 3-2 against Australia.',
        content: 'Full article content goes here with complete match details and analysis...',
        category: 'Series',
        author: 'Sports Reporter',
        featured: true,
        views: 15420,
        likes: 1250,
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'Virat Kohli Breaks Another Record',
        excerpt: 'Virat Kohli becomes the first batsman to score 8000 runs in Test cricket this year.',
        content: 'Full article content about this milestone achievement...',
        category: 'Player News',
        author: 'Cricket Analyst',
        featured: true,
        views: 12300,
        likes: 980,
        isPublished: true,
        publishedAt: new Date()
      },
      {
        title: 'T20 World Cup Schedule Announced',
        excerpt: 'ICC announces the complete schedule for the upcoming T20 World Cup.',
        content: 'Detailed schedule and venue information...',
        category: 'Events',
        author: 'Cricket Correspondent',
        featured: false,
        views: 8900,
        likes: 650,
        isPublished: true,
        publishedAt: new Date()
      }
    ]);
    console.log(`✓ ${news.length} news articles created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📋 Admin Login:');
    console.log('   Email: admin@cricsphere.com');
    console.log('   Password: admin123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
