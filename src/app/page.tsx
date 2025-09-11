'use client';

import { useState } from 'react';
import { request } from '../../lib/api';
import { nowLocalForInput } from '../../lib/datetime';
import { NotificationDto, CreateNotificationRequest, UpdateGuestStatusRequest } from '../../types/notification';

export default function Home() {
  // A) 사용자 알림 목록 섹션
  const [userId, setUserId] = useState('');
  const [notifications, setNotifications] = useState<NotificationDto[]>([]);
  const [notificationsLoading, setNotificationsLoading] = useState(false);
  const [notificationsError, setNotificationsError] = useState('');

  // B) 알림 상세 조회 섹션
  const [notificationId, setNotificationId] = useState('');
  const [notificationDetail, setNotificationDetail] = useState<NotificationDto | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  // C) 알림 생성 섹션
  const [createForm, setCreateForm] = useState<CreateNotificationRequest>({
    user_id: '',
    appointment_id: '',
    guest_id: '',
    notification_time: nowLocalForInput(),
  });
  const [createResult, setCreateResult] = useState<NotificationDto | null>(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  // D) 게스트 상태 변경 섹션
  const [updateForm, setUpdateForm] = useState({
    notification_id: '',
    guest_id: '',
    guest_status: 'coming' as 'coming' | 'came' | 'no_show',
  });
  const [updateResult, setUpdateResult] = useState<any>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');

  // A) 사용자 알림 목록 불러오기
  const handleFetchNotifications = async () => {
    setNotificationsLoading(true);
    setNotificationsError('');
    try {
      const url = userId ? `/notifications?userId=${userId}` : '/notifications';
      const data = await request<NotificationDto[]>(url);
      setNotifications(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setNotificationsError(error instanceof Error ? error.message : 'Failed to fetch notifications');
    } finally {
      setNotificationsLoading(false);
    }
  };

  // B) 알림 상세 조회
  const handleFetchDetail = async () => {
    if (!notificationId) return;
    setDetailLoading(true);
    setDetailError('');
    try {
      const data = await request<NotificationDto>(`/notifications/${notificationId}`);
      setNotificationDetail(data);
    } catch (error) {
      setDetailError(error instanceof Error ? error.message : 'Failed to fetch notification detail');
    } finally {
      setDetailLoading(false);
    }
  };

  // C) 알림 생성
  const handleCreateNotification = async () => {
    setCreateLoading(true);
    setCreateError('');
    try {
      // datetime-local 값을 Java LocalDateTime 형식으로 변환 (초 추가)
      const notificationTime = createForm.notification_time + ':00';
      const requestData = { ...createForm, notification_time: notificationTime };
      
      const data = await request<NotificationDto>('/notifications', {
        method: 'POST',
        body: JSON.stringify(requestData),
      });
      setCreateResult(data);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : 'Failed to create notification');
    } finally {
      setCreateLoading(false);
    }
  };

  // D) 게스트 상태 변경
  const handleUpdateGuestStatus = async () => {
    if (!updateForm.notification_id || !updateForm.guest_id) return;
    setUpdateLoading(true);
    setUpdateError('');
    try {
      const requestData: UpdateGuestStatusRequest = {
        guest_status: updateForm.guest_status,
      };
      
      const data = await request(`/notifications/${updateForm.notification_id}/guests/${updateForm.guest_id}/guest_status`, {
        method: 'PATCH',
        body: JSON.stringify(requestData),
      });
      setUpdateResult(data);
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Failed to update guest status');
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Notification Service 관리
        </h1>

        {/* A) 사용자 알림 목록 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">A) 사용자 알림 목록</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="사용자 ID (비워두면 전체 목록)"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleFetchNotifications}
                disabled={notificationsLoading}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium"
              >
                {notificationsLoading ? '불러오는 중...' : '불러오기'}
              </button>
            </div>
            
            {notificationsError && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {notificationsError}
              </div>
            )}
            
            {notifications.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">결과:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(notifications, null, 2)}
                </pre>
              </div>
            )}
          </div>
          {/* 호출 엔드포인트: GET /api/notifications 또는 GET /api/notifications?userId={userId} */}
        </div>

        {/* B) 알림 상세 조회 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">B) 알림 상세 조회</h2>
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="알림 ID"
                value={notificationId}
                onChange={(e) => setNotificationId(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleFetchDetail}
                disabled={detailLoading || !notificationId}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 font-medium"
              >
                {detailLoading ? '조회 중...' : '조회'}
              </button>
            </div>
            
            {detailError && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {detailError}
              </div>
            )}
            
            {notificationDetail && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">결과:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(notificationDetail, null, 2)}
                </pre>
              </div>
            )}
          </div>
          {/* 호출 엔드포인트: GET /api/notifications/{id} */}
        </div>

        {/* C) 알림 생성 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">C) 알림 생성</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="사용자 ID"
                value={createForm.user_id}
                onChange={(e) => setCreateForm({ ...createForm, user_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="약속 ID"
                value={createForm.appointment_id}
                onChange={(e) => setCreateForm({ ...createForm, appointment_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="게스트 ID"
                value={createForm.guest_id}
                onChange={(e) => setCreateForm({ ...createForm, guest_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="datetime-local"
                value={createForm.notification_time}
                onChange={(e) => setCreateForm({ ...createForm, notification_time: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button
              onClick={handleCreateNotification}
              disabled={createLoading || !createForm.user_id || !createForm.appointment_id || !createForm.guest_id}
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 font-medium"
            >
              {createLoading ? '생성 중...' : '생성'}
            </button>
            
            {createError && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {createError}
              </div>
            )}
            
            {createResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">결과:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(createResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
          {/* 호출 엔드포인트: POST /api/notifications */}
        </div>

        {/* D) 게스트 상태 변경 섹션 */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">D) 게스트 상태 변경</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="알림 ID"
                value={updateForm.notification_id}
                onChange={(e) => setUpdateForm({ ...updateForm, notification_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="게스트 ID"
                value={updateForm.guest_id}
                onChange={(e) => setUpdateForm({ ...updateForm, guest_id: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={updateForm.guest_status}
                onChange={(e) => setUpdateForm({ ...updateForm, guest_status: e.target.value as 'coming' | 'came' | 'no_show' })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="coming">coming</option>
                <option value="came">came</option>
                <option value="no_show">no_show</option>
              </select>
            </div>
            
            <button
              onClick={handleUpdateGuestStatus}
              disabled={updateLoading || !updateForm.notification_id || !updateForm.guest_id}
              className="w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 font-medium"
            >
              {updateLoading ? '변경 중...' : '변경'}
            </button>
            
            {updateError && (
              <div className="text-red-600 bg-red-50 p-3 rounded-lg">
                {updateError}
              </div>
            )}
            
            {updateResult && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">결과:</h3>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                  {JSON.stringify(updateResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
          {/* 호출 엔드포인트: PATCH /api/notifications/{id}/guests/{guestId}/guest_status */}
        </div>
      </div>
    </div>
  );
}
