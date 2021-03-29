import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import Search from './Search'

test('render a Search', () => {
  const onSearch = jest.fn()
  render(<Search onSearch={onSearch} search="" />)
  userEvent.click(screen.getByText('Recherche'))
  expect(onSearch).toHaveBeenCalled()
  expect(onSearch).toHaveBeenCalledWith('')
})

test('Search can return the current typed value', () => {
  const onSearch = jest.fn()

  render(<Search onSearch={onSearch} search="" />)
  userEvent.type(screen.getByTestId('search-input'), 'die hard')
  userEvent.click(screen.getByTestId('search-button'))
  expect(onSearch).toHaveBeenCalled()
  expect(onSearch).toHaveBeenCalledWith('die hard')
})
