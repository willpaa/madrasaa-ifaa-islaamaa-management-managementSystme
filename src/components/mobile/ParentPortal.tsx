import React, { useState } from 'react';
import { 
  Student, 
  FeeInvoice, 
  ChatMessage, 
  NoticeAnnouncement,
  SubjectGrade
} from '../../types/school';
import { 
  Users, 
  CreditCard, 
  MessageSquare, 
  Bus, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  DollarSign, 
  ShieldCheck, 
  ChevronRight,
  Download,
  Calendar,
  Clock,
  MapPin,
  TrendingUp
} from 'lucide-react';

interface ParentPortalProps {
  childrenList: Student[];
  selectedChild: Student;
  onSelectChild: (student: Student) => void;
  invoices: FeeInvoice[];
  onPayInvoice: (invoiceId: string) => void;
  chatMessages: ChatMessage[];
  onSendMessage: (text: string) => void;
  announcements: NoticeAnnouncement[];
  grades: SubjectGrade[];
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  childrenList,
  selectedChild,
  onSelectChild,
  invoices,
  onPayInvoice,
  chatMessages,
  onSendMessage,
  announcements,
  grades
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'finance' | 'chat' | 'bus' | 'report'>('overview');
  const [newMessage, setNewMessage] = useState('');
  const [payingInvoiceId, setPayingInvoiceId] = useState<string | null>(null);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<string | null>(null);
  const [hasSignedReportCard, setHasSignedReportCard] = useState(false);
  const [excuseNoteSubmitted, setExcuseNoteSubmitted] = useState(false);
  const [showExcuseModal, setShowExcuseModal] = useState(false);

  const studentInvoices = invoices.filter(inv => inv.studentId === selectedChild.id);
  const pendingInvoice = studentInvoices.find(inv => inv.status !== 'paid');

  const handlePay = (id: string) => {
    setPayingInvoiceId(id);
    setTimeout(() => {
      onPayInvoice(id);
      setPayingInvoiceId(null);
      setPaymentSuccessReceipt(`REC-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1200);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    onSendMessage(newMessage.trim());
    setNewMessage('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      {/* Top Header: Parent & Child Switcher */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
              Guardian Portal • K-12 Mobile
            </div>
            <h2 className="text-sm font-bold text-white mt-0.5">David &amp; Elena Chen</h2>
          </div>

          <span className="px-2 py-0.5 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full font-medium">
            2 Children Enrolled
          </span>
        </div>

        {/* Child Selector Pills */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {childrenList.map((child) => {
            const isSelected = child.id === selectedChild.id;
            return (
              <button
                key={child.id}
                onClick={() => onSelectChild(child)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <img 
                  src={child.avatar} 
                  alt={child.name} 
                  className="w-5 h-5 rounded-full object-cover" 
                />
                <span className="font-semibold">{child.name}</span>
                <span className={`text-[10px] px-1.5 rounded ${isSelected ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'}`}>
                  Gr {child.grade}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {paymentSuccessReceipt && (
          <div className="p-3 bg-emerald-950/80 border border-emerald-500/60 rounded-xl text-xs text-emerald-200 flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold">Payment Verified!</div>
                <div className="text-[10px] text-emerald-300 font-mono">Receipt: {paymentSuccessReceipt}</div>
              </div>
            </div>
            <button 
              onClick={() => setPaymentSuccessReceipt(null)} 
              className="text-[11px] underline text-emerald-400 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Daily Attendance Status Card */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Today&apos;s Attendance Record
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  PRESENT (08:05 AM)
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-300">
                <span>Homeroom Room {selectedChild.grade === 10 ? '304' : '102'}</span>
                <span>Term Streak: <strong className="text-white">{selectedChild.attendanceRate}%</strong></span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setShowExcuseModal(true)}
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Notify Upcoming Absence / Doctor Note</span>
                </button>
                {excuseNoteSubmitted && (
                  <span className="text-[10px] text-emerald-400 font-semibold">Note On File</span>
                )}
              </div>
            </div>

            {/* School Bus Live Telemetry Card */}
            <div className="p-4 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">School Transit GPS</h4>
                    <p className="text-[10px] text-indigo-300 font-mono">{selectedChild.busRoute}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {selectedChild.busStatus}
                </span>
              </div>

              <div className="mt-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800/70 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Next Pickup Stop</span>
                  <span className="text-slate-200 font-medium">Maple &amp; 14th Ave</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">ETA</span>
                  <span className="text-emerald-400 font-bold">~4 mins away</span>
                </div>
              </div>
            </div>

            {/* Outstanding Balance Notice */}
            {pendingInvoice && (
              <div className="p-4 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/40 rounded-2xl">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      Term 2 Tuition Due
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      ${pendingInvoice.amount.toFixed(2)}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">Due Date: {pendingInvoice.dueDate}</p>
                  </div>
                  <button
                    onClick={() => handlePay(pendingInvoice.id)}
                    disabled={payingInvoiceId === pendingInvoice.id}
                    className="px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl cursor-pointer shadow-md disabled:opacity-50 transition-colors"
                  >
                    {payingInvoiceId === pendingInvoice.id ? 'Processing...' : 'Pay with 1-Tap'}
                  </button>
                </div>
              </div>
            )}

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('report')}
                className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 text-left transition-colors cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-indigo-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Term Report Card</div>
                <div className="text-[10px] text-slate-400">View grades &amp; sign</div>
              </button>

              <button
                onClick={() => setActiveTab('chat')}
                className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 text-left transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">Teacher Direct Chat</div>
                <div className="text-[10px] text-slate-400">Dr. Evelyn Vance</div>
              </button>
            </div>
          </>
        )}

        {/* TAB 2: FINANCE & INVOICES */}
        {activeTab === 'finance' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Tuition Account • {selectedChild.name}
              </span>
              <div className="text-2xl font-bold text-white mt-1">
                {pendingInvoice ? `$${pendingInvoice.amount.toFixed(2)}` : '$0.00 Outstanding'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Tax-deductible educational expenses are automatically receipted.
              </p>
            </div>

            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Invoices &amp; Receipts</h4>
            <div className="space-y-3">
              {studentInvoices.map((inv) => (
                <div key={inv.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold">{inv.id}</span>
                      <h5 className="text-xs font-bold text-white mt-0.5">{inv.term}</h5>
                      <p className="text-[11px] text-slate-400 mt-1">{inv.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">${inv.amount.toFixed(2)}</div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded mt-1 inline-block ${
                        inv.status === 'paid' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                    {inv.status === 'paid' ? (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle className="w-3.5 h-3.5" /> Paid: {inv.receiptNumber}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400">Due: {inv.dueDate}</span>
                    )}

                    {inv.status === 'due' && (
                      <button
                        onClick={() => handlePay(inv.id)}
                        disabled={payingInvoiceId === inv.id}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-lg cursor-pointer transition-colors shadow-sm"
                      >
                        {payingInvoiceId === inv.id ? 'Processing...' : 'Pay Online'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CHAT WITH EDUCATOR */}
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[520px]">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                EV
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Dr. Evelyn Vance</h4>
                <p className="text-[10px] text-emerald-400">Homeroom 10-A • Office Hours 8:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
              {chatMessages.map((msg) => {
                const isParent = msg.senderRole === 'parent';
                return (
                  <div key={msg.id} className={`flex flex-col ${isParent ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isParent 
                        ? 'bg-indigo-600 text-white rounded-br-xs' 
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-xs'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                );
              })}
            </div>

            <form onSubmit={handleSendChat} className="mt-3 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message teacher..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: BUS TRACKING */}
        {activeTab === 'bus' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Route 4B Telemetry</h4>
                  <p className="text-[11px] text-slate-400">Driver: Mr. Thomas Gable</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BUS ON SCHEDULE
                </span>
              </div>

              {/* Graphical Route Timeline */}
              <div className="mt-6 space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold z-10">
                    ✓
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Campus Departure</h5>
                    <p className="text-[10px] text-slate-400">07:20 AM • Madrasaa Ifaa Islaamaa Gate 2</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold z-10 animate-pulse">
                    ●
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-indigo-300">Oakridge Crossing (In Transit)</h5>
                    <p className="text-[10px] text-slate-400">07:38 AM • Current Vehicle Location</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 text-slate-400 flex items-center justify-center text-[10px] font-bold z-10">
                    3
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-300">Your Home Stop: Maple &amp; 14th</h5>
                    <p className="text-[10px] text-amber-400 font-medium">Estimated 07:44 AM (ETA 4 min)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-400 text-[10px] block">Emergency Dispatcher</span>
                <span className="text-white font-mono">+1 (555) 880-BUS1</span>
              </div>
              <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg">
                Call Driver
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: REPORT CARD & SIGNING */}
        {activeTab === 'report' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Official Term 1 Report Card
                  </h4>
                  <p className="text-[10px] text-slate-400">Academic Year 2026-2027 • Grade {selectedChild.grade}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-indigo-400">{selectedChild.currentGpa.toFixed(2)} GPA</div>
                  <span className="text-[10px] text-emerald-400 font-semibold">Exemplary Standing</span>
                </div>
              </div>

              {/* Subject Rows */}
              <div className="divide-y divide-slate-800/80 my-3">
                {grades.slice(0, 3).map((g, i) => (
                  <div key={i} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-200">{g.subject}</span>
                      <span className="text-[10px] text-slate-400 block">{g.teacher}</span>
                    </div>
                    <span className="font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      {g.letterGrade} ({g.score}%)
                    </span>
                  </div>
                ))}
              </div>

              {/* Digital Parent Signature Box */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                {hasSignedReportCard ? (
                  <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold">Digitally Signed &amp; Acknowledged</div>
                      <div className="text-[10px] text-slate-400">Timestamp: 2026-10-21 09:44 AM • David Chen</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      By tapping below, you certify that you have reviewed the term grades, educator commentary, and attendance ledger.
                    </p>
                    <button
                      onClick={() => setHasSignedReportCard(true)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-colors"
                    >
                      <FileCheck2 className="w-3.5 h-3.5" />
                      <span>Sign &amp; Acknowledge Report Card</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Excuse Note Submission */}
      {showExcuseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl max-w-xs w-full shadow-2xl space-y-3">
            <h4 className="text-sm font-bold text-white">Submit Absence Notice</h4>
            <p className="text-xs text-slate-400">
              Notify homeroom teacher for {selectedChild.name} (Grade {selectedChild.grade}).
            </p>
            <select className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg">
              <option>Medical Appointment / Illness</option>
              <option>Family Bereavement / Emergency</option>
              <option>Approved Academic Competition</option>
            </select>
            <textarea
              placeholder="Doctor note details or remarks..."
              rows={2}
              className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 p-2 rounded-lg placeholder-slate-600"
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowExcuseModal(false)}
                className="flex-1 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setExcuseNoteSubmitted(true);
                  setShowExcuseModal(false);
                }}
                className="flex-1 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg cursor-pointer"
              >
                Submit Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Parent Navigation */}
      <div className="h-14 bg-slate-950/95 border-t border-slate-800 flex items-center justify-around px-2 z-20">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Child</span>
        </button>

        <button
          onClick={() => setActiveTab('finance')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'finance' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Tuition</span>
        </button>

        <button
          onClick={() => setActiveTab('bus')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'bus' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <Bus className="w-4 h-4" />
          <span>Bus Live</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center gap-1 text-[10px] font-medium transition-colors cursor-pointer ${
            activeTab === 'chat' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Teacher</span>
        </button>
      </div>
    </div>
  );
};
