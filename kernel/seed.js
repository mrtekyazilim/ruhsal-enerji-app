const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');
const Product = require('./src/models/Product');

const seedDB = async () => {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for seeding...');

    // Eski verileri temizle
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Old data cleared');

    // Test kullanıcıları ekle
    const users = [
      { name: 'Ahmet Yılmaz', phone: '5551234567' },
      { name: 'Fatma Kaya', phone: '5552345678' },
      { name: 'Mehmet Şahin', phone: '5553456789' },
      { name: 'Ayşe Demir', phone: '5554567890' },
      { name: 'İbrahim Özkan', phone: '5555678901' },
      { name: 'Zeynep Kurtç', phone: '5556789012' },
    ];

    const createdUsers = await User.insertMany(users);
    console.log(`${createdUsers.length} users created`);

    // Test ürünleri ekle
    const products = [
      { name: 'Yoga Mat', price: 29.99 },
      { name: 'Meditasyon Yastığı', price: 34.99 },
      { name: 'Ruhsal Enerji Kitabı', price: 19.99 },
      { name: 'Kristal Set', price: 49.99 },
      { name: 'Temizleme Fincanı', price: 44.99 },
      { name: 'Mindfulness Uygulaması', price: 9.99 },
    ];

    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products created`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

seedDB();
