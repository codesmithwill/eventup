import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
  vi.resetModules();
});

describe('Favorites page', () => {
  it('mostra mensagem quando não há favoritos', async () => {
    vi.doMock('../hooks/useAuth', () => ({
      useAuth: () => ({ user: { uid: '1', favorites: [] }, loading: false }),
    }));

    vi.doMock('../services/eventService', () => ({
      eventService: { getAllEvents: async () => [] },
    }));

    const { default: Favorites } = await import('../pages/Favorites');

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Você ainda não favoritou nenhum evento/i)).toBeTruthy();
  });

  it('lista eventos favoritados quando existem', async () => {
    const sampleEvents = [
      { id: '1', title: 'Evento Teste', description: 'desc' },
      { id: '2', title: 'Outro Evento', description: 'desc2' },
    ];

    vi.doMock('../hooks/useAuth', () => ({
      useAuth: () => ({ user: { uid: '1', favorites: ['1'] }, loading: false }),
    }));

    vi.doMock('../services/eventService', () => ({
      eventService: { getAllEvents: async () => sampleEvents },
    }));

    const { default: Favorites } = await import('../pages/Favorites');

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Evento Teste/i)).toBeTruthy();
  });
});
