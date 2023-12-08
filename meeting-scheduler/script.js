document.addEventListener('DOMContentLoaded', loadMeetings);

function loadMeetings() {
    const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
    const meetingList = document.getElementById('meetingList');
    meetingList.innerHTML = '';
    meetings.forEach((meeting, index) => {
        const li = document.createElement('li');
        li.textContent = `${meeting.title} - ${new Date(meeting.time).toLocaleString()} - Agenda: ${meeting.agenda} `;

        const emailButton = createButton('Send Email Reminder', () => sendEmailReminder(meeting));
        const deleteButton = createButton('Delete', () => deleteMeeting(index));
        li.appendChild(emailButton);
        li.appendChild(deleteButton);

        meetingList.appendChild(li);
    });
}

function sendEmailReminder(meeting) {
    const emailSubject = `Reminder for Meeting: ${meeting.title}`;
    const emailBody = `This is a reminder for the meeting titled '${meeting.title}' scheduled at ${new Date(meeting.time).toLocaleString()}. \n\nAgenda: ${meeting.agenda}`;
    window.open(`mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`);
}

function deleteMeeting(index) {
    if (confirm('Are you sure you want to delete this meeting?')) {
        const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings.splice(index, 1);
        localStorage.setItem('meetings', JSON.stringify(meetings));
        loadMeetings();
    }
}

function addMeeting() {
    const title = document.getElementById('meetingTitle').value.trim();
    const time = document.getElementById('meetingTime').value;
    const agenda = document.getElementById('meetingAgenda').value.trim();

    if (title && time && agenda) {
        const meetings = JSON.parse(localStorage.getItem('meetings')) || [];
        meetings.push({ title, time, agenda });
        localStorage.setItem('meetings', JSON.stringify(meetings));
        loadMeetings();
        clearForm();
    } else {
        alert("Please enter all meeting details!");
    }
}

function clearForm() {
    document.getElementById('meetingTitle').value = '';
    document.getElementById('meetingTime').value = '';
    document.getElementById('meetingAgenda').value = '';
}

function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = 'meeting-button';
    button.onclick = onClick;
    return button;
}
