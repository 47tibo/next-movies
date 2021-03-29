import { render, screen } from '@testing-library/react'
import React from 'react'
import { Card } from './Card'

test('render a card', () => {
  render(
    <Card
      imdb_url="www.toto.com"
      poster_url=""
      release_date="06-06-1944"
      title="hello"
    />,
  )
  expect(screen.getByText('hello')).toHaveClass('title', 'is-4')
  expect(screen.getByText('Page Imdb').closest('a')).toHaveAttribute(
    'href',
    'www.toto.com',
  )
  expect(screen.getByTestId('releaseDate')).toHaveTextContent(
    '06-06-1944',
  )
})
