using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interface;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendence
    {
        public class Command : IRequest
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;
        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _userAccessor = userAccessor;
            _context = context;

        }
        public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .FirstOrDefaultAsync(x => x.Id==request.Id);

            if(activity==null)
            {
                throw new RestException(System.Net.HttpStatusCode.NotFound, new {activity="Not found"});
            }

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

            if(user==null)
            {
                throw new RestException(System.Net.HttpStatusCode.NotFound, new {user="Not found"});
            }

            var hostUserName = activity.Attendees.FirstOrDefault(x=>x.IsHost)?.AppUser?.UserName;

            var attendence = activity.Attendees.FirstOrDefault(x=>x.AppUser.UserName==user.UserName);

            if(attendence != null && hostUserName == user.UserName)
            {
                activity.IsCancelled = !activity.IsCancelled;
            }

            if(attendence != null && hostUserName != user.UserName)
            {
                activity.Attendees.Remove(attendence);
            }

            if(attendence==null)
            {
                attendence = new Domain.ActivityAttendee
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false
                };
                activity.Attendees.Add(attendence);
            }

            var result = await _context.SaveChangesAsync() > 0;
            if(result) return Unit.Value;
            throw new Exception("Problem updating attendence");
        }
    }
    }
}