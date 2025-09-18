// Hypothetical blockchain_service_page.js file

import React from 'react';

function BlockchainServicePage() {
  return (
    <div>
      <h1>Blockchain Services</h1>
      <ImageRow />
    </div>
  );
}

function ImageRow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      <BlockchainImage src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=500&h=300&fit=crop" alt="Blockchain 1" />
      <BlockchainImage src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&h=300&fit=crop" alt="Blockchain 2" />
      <BlockchainImage src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=500&h=300&fit=crop" alt="dApp Development" />
      <BlockchainImage src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=500&h=300&fit=crop" alt="Crypto Wallet" />
      <BlockchainImage src="https://images.unsplash.com/photo-1644088379091-d574269d422f?w=500&h=300&fit=crop" alt="Layer 2 Blockchain" />
      <BlockchainImage src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=500&h=300&fit=crop" alt="Blockchain Protocol" />
      <BlockchainImage src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=500&h=300&fit=crop" alt="NFT Marketplace" />
      <BlockchainImage src="https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=500&h=300&fit=crop" alt="Smart Contract" />
      <BlockchainImage src="https://images.unsplash.com/photo-1643101809204-6fb869816dbe?w=500&h=300&fit=crop" alt="Metaverse" />
    </div>
  );
}

interface BlockchainImageProps {
  src: string;
  alt: string;
}

function BlockchainImage({ src, alt }: BlockchainImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      style={{ width: '300px', height: '200px', margin: '10px', objectFit: 'cover' }}
    />
  );
}

export default BlockchainServicePage;