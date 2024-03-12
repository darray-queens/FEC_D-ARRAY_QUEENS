/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Review from '../components/review/Review';
import Modal from '../components/review/Modal';
import ReviewList from '../components/review/ReviewList';


describe('Review', () => {
  const entry = {
    rating: 4,
    reviewer_name: 'Test',
    date: '2024-03-05',
    summary: 'Great product!',
    body: 'Very Yummy lsjdf;ladsjf;dlsajf;ajdf;dasjf;dsajf;dlasfjdlsfjd;safjad;sfj;adsfjadsfsfjlsadjf;daslfjldsajfladsjfldsa;jfl;adsfjldsajf;sadjfl;asdfjl;dasfjdasl;kfjas;lsdfjdsa;fjda;slfjldasfjl;dasjfdasjfasdljfl;dsfjlads;fj;ladfj;alsdfj;lasdfjadslfjdas;fjl;asdfjla;sfjla;djfl;adsjfla;sdfj;adlsjfla;sdjfl;afdjl;adsjf;asdfj.',
    photos: [ {
      "id": 2459186,
      "url": "https://i.insider.com/602ee9ced3ad27001837f2ac?width=1000%26format=jpeg%26auto=webp"
  }],
    recommend: true,
  };

  const entry2 = {
    rating: 4,
    reviewer_name: 'Test',
    date: '2024-03-05',
    summary: 'Great product!',
    body: 'Very Yummy lsjdf;ladsjf;dlsajf;ajdf;dasjf;dsajf;dlasfjdlsfjd;safjad;sfj;adsfjadsfsfjlsadjf;daslfjldsajfladsjfldsa;jfl;adsfjldsajf;sadjfl;asdfjl;dasfjdasl;kfjas;lsdfjdsa;fjda;slfjldasfjl;dasjfdasjfasdljfl;dsfjlads;fj;ladfj;alsdfj;lasdfjadslfjdas;fjl;asdfjla;sfjla;djfl;adsjfla;sdfj;adlsjfla;sdjfl;afdjl;adsjf;asdfj.',
    photos: [],
    recommend: false,
  };

  it('renders reviewer name', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText(/Test/i)).toBeTruthy();
  });

  it('renders review date', () => {
    render(<Review entry={entry} />);
    const date = new Date(entry.date).toLocaleDateString();

    expect(screen.getByText(new RegExp(date, 'i'))).toBeTruthy();
  });

  it('renders a review sumary', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText('Great product!')).toBeTruthy();
  });

  it('renders a review body (first 250 characters)', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText(entry.body.slice(0, 250))).toBeTruthy();
  });

  it('renders show more when review body is over 250 characters', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText('Show more')).toBeTruthy();
  });

  it('expands review text when "Show more" link is clicked', () => {
    render(<Review entry={entry} />);
    fireEvent.click(screen.getByText('Show more'));
    expect(screen.getByText(entry.body)).toBeTruthy();
  });

  it('renders recommendations', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText('I recommend this product')).toBeTruthy();
  });

  it('should not render I recommend if there is no recommendation', () => {
    render(<Review entry={entry2} />);
    expect(screen.queryByText('I recommend this product')).toBeNull();
  });

  it('renders a checkmark if product is recommended', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText('✓')).toBeTruthy();
  });

  it('renders a helpful button', () => {
    render(<Review entry={entry} />);
    expect(screen.getByText('Helpful? Yes ()')).toBeTruthy();
  });

  it('opens modal when clicking on a photo', () => {
    render(<Review entry={entry} />);
    const photo1 = screen.getByAltText('2459186');
    fireEvent.click(photo1);
    expect(screen.getByText('x')).toBeTruthy();
  });
});