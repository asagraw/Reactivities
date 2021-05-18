﻿using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public DbSet<Value> Values { get; set; }

        public DbSet<Activity> Activities {get; set;}
        public DbSet<ActivityAttendee> ActivitiyAttendees {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new{aa.AppUserId, aa.ActivityId}));

            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.AppUser)
            .WithMany(a => a.Activities)
            .HasForeignKey(aa => aa.AppUserId);

            builder.Entity<ActivityAttendee>()
            .HasOne(u => u.Activity)
            .WithMany(a => a.Attendees)
            .HasForeignKey(aa => aa.ActivityId);
        }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     builder.Entity<Value>()
        //     .HasData(
        //         new Value {Id = 1, Name = "Value 101"},
        //         new Value {Id = 2, Name = "Value 102"},
        //         new Value {Id = 3, Name = "Value 103"}
        //     );
        // }
    }
}
