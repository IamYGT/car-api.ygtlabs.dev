<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Ticket;
use Illuminate\Auth\Access\HandlesAuthorization;

class TicketPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Ticket $ticket)
    {
        return $user->id === $ticket->user_id || $user->hasRole('admin');
    }

    public function reply(User $user, Ticket $ticket)
    {
        return $user->id === $ticket->user_id || $user->hasRole('admin');
    }

    public function create(User $user)
    {
        return true; // Tüm kullanıcılar ticket oluşturabilir
    }

    public function update(User $user, Ticket $ticket)
    {
        return $user->hasRole('admin');
    }

    public function delete(User $user, Ticket $ticket)
    {
        return $user->hasRole('admin');
    }
} 