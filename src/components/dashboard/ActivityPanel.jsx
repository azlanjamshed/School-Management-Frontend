const ActivityPanel = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm">
      <h3 className="font-semibold mb-4">Recent Activity</h3>

      <div className="space-y-4 text-sm">
        <p>💰 Fee Payment Received</p>
        <p>📄 Grade Uploaded</p>
        <p>📢 New Announcement</p>
      </div>
    </div>
  );
};

export default ActivityPanel;
