import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  vi.resetModules();
});

describe('UpcomingEvents favoritar', () => {
  it('chama toggleFavorite ao clicar no coração', async () => {
    const sampleEvents = [
      { id: '1', title: 'Evento Teste', date: '2026-12-12', location: 'Local' },
    ];

    vi.doMock('../hooks/useAuth', () => ({
      useAuth: () => ({ user: { uid: '1', favorites: [] }, loading: false }),
    }));

    vi.doMock('../services/eventService', () => ({
      eventService: { getAllEvents: async () => sampleEvents },
    }));

    vi.doMock('../services/authService', () => ({
      mockAuth: { toggleFavorite: vi.fn() },
    }));

    const { default: UpcomingEvents } = await import('../pages/UpcomingEvents');
    const authMod = await import('../services/authService');
    const toggleMock = authMod.mockAuth.toggleFavorite;

    render(
      <MemoryRouter>
        <UpcomingEvents />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Evento Teste/i)).toBeTruthy();

    const btn = await screen.findByTitle(/Adicionar aos favoritos/i);
    fireEvent.click(btn);

    expect(toggleMock).toHaveBeenCalledWith('1', '1');
  });
});
