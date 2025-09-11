'use client';

import { useState } from 'react';
import { getAllUsers, createUser, getUser, login, deleteUser } from '../../lib/user-api';
import { getAllLocations, getLocationById, createLocation, deleteLocation } from '../../lib/location-api';
import type { UserCreateRequest, UserLoginRequest, UserResponse } from '../../types/user';
import type { LocationRequest, LocationResponse } from '../../types/location';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchUserId, setSearchUserId] = useState('test@kt.com');
  const [createForm, setCreateForm] = useState<UserCreateRequest>({
    userId: 'test@kt.com',
    username: '테스트사용자',
    nickname: '테스터',
    password: 'password123'
  });
  const [locationForm, setLocationForm] = useState<LocationRequest>({
    locationId: 'loc001',
    building: '광화문',
    floor: '1'
  });
  const [searchLocationId, setSearchLocationId] = useState('loc001');

  const handleTest = async (testFunction: () => Promise<any>, testName: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log(`${testName} 테스트 시작...`);
      const data = await testFunction();
      setResult(data);
      console.log(`${testName} 성공:`, data);
    } catch (err) {
      console.error(`${testName} 실패:`, err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  // 테스트 함수들
  const testGetAllUsers = () => handleTest(
    () => getAllUsers(),
    '모든 사용자 조회'
  );

  const testCreateUser = () => {
    return handleTest(
      () => createUser(createForm),
      `사용자 생성 (${createForm.userId})`
    );
  };

  const testGetUser = () => handleTest(
    () => getUser(searchUserId),
    `특정 사용자 조회 (${searchUserId})`
  );

  const testLogin = () => {
    const loginData: UserLoginRequest = {
      userId: createForm.userId,
      password: createForm.password
    };
    return handleTest(
      () => login(loginData),
      `로그인 (${createForm.userId})`
    );
  };

  const testDeleteUser = () => handleTest(
    () => deleteUser(searchUserId),
    `사용자 삭제 (${searchUserId})`
  );

  // Location Service 테스트 함수들
  const testGetAllLocations = () => handleTest(
    () => getAllLocations(),
    '모든 위치 조회'
  );

  const testCreateLocation = () => {
    return handleTest(
      () => createLocation(locationForm),
      `위치 생성 (${locationForm.locationId})`
    );
  };

  const testGetLocation = () => handleTest(
    () => getLocationById(searchLocationId),
    `특정 위치 조회 (${searchLocationId})`
  );

  const testDeleteLocation = () => handleTest(
    () => deleteLocation(searchLocationId),
    `위치 삭제 (${searchLocationId})`
  );

  // 테스트 데이터 일괄 생성
  const testData = [
    { locationId: 'loc002', building: '광화문', floor: '2' },
    { locationId: 'loc003', building: '광화문', floor: '3' },
    { locationId: 'loc004', building: '광화문', floor: '4' },
    { locationId: 'loc101', building: '판교', floor: '1' },
    { locationId: 'loc102', building: '판교', floor: '2' },
    { locationId: 'loc103', building: '판교', floor: '3' },
    { locationId: 'loc104', building: '판교', floor: '4' },
    { locationId: 'loc105', building: '판교', floor: '5' },
    { locationId: 'loc106', building: '판교', floor: '6' },
    { locationId: 'loc107', building: '판교', floor: '7' },
    { locationId: 'loc108', building: '판교', floor: '8' },
    { locationId: 'loc201', building: '송파', floor: '1' },
    { locationId: 'loc202', building: '송파', floor: '2' },
    { locationId: 'loc310', building: '우면', floor: '10' },
    { locationId: 'loc311', building: '우면', floor: '11' }
  ];

  const testCreateAllLocations = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('모든 테스트 위치 데이터 생성 시작...');
      const results = [];
      
      for (const locationData of testData) {
        try {
          const result = await createLocation(locationData);
          results.push({ success: true, data: result });
          console.log(`위치 생성 성공: ${locationData.locationId}`);
        } catch (err) {
          results.push({ 
            success: false, 
            locationId: locationData.locationId, 
            error: err instanceof Error ? err.message : '알 수 없는 오류' 
          });
          console.error(`위치 생성 실패: ${locationData.locationId}`, err);
        }
      }
      
      setResult({
        message: '테스트 데이터 생성 완료',
        total: testData.length,
        success: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results
      });
    } catch (err) {
      console.error('테스트 데이터 생성 실패:', err);
      setError(err instanceof Error ? err.message : '알 수 없는 오류');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          KT Coffee Chat 서비스 테스트
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">👤 User Service 테스트</h2>
          
          {/* 사용자 생성 폼 */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">사용자 생성 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="createUserId" className="block text-sm font-medium text-gray-700 mb-1">
                  사용자 ID (KT 이메일):
                </label>
                <input
                  id="createUserId"
                  type="email"
                  placeholder="user@kt.com"
                  value={createForm.userId}
                  onChange={(e) => setCreateForm({...createForm, userId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="createUsername" className="block text-sm font-medium text-gray-700 mb-1">
                  사용자명:
                </label>
                <input
                  id="createUsername"
                  type="text"
                  placeholder="홍길동"
                  value={createForm.username}
                  onChange={(e) => setCreateForm({...createForm, username: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="createNickname" className="block text-sm font-medium text-gray-700 mb-1">
                  닉네임:
                </label>
                <input
                  id="createNickname"
                  type="text"
                  placeholder="커피러버"
                  value={createForm.nickname}
                  onChange={(e) => setCreateForm({...createForm, nickname: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="createPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  비밀번호 (8자 이상):
                </label>
                <input
                  id="createPassword"
                  type="password"
                  placeholder="password123"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({...createForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 사용자 ID 입력 필드 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <label htmlFor="searchUserId" className="block text-sm font-medium text-gray-700 mb-2">
              조회/삭제할 사용자 ID:
            </label>
            <input
              id="searchUserId"
              type="email"
              placeholder="user@kt.com"
              value={searchUserId}
              onChange={(e) => setSearchUserId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <button
              onClick={testGetAllUsers}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              모든 사용자 조회
            </button>
            
            <button
              onClick={testCreateUser}
              disabled={loading || !createForm.userId.trim() || !createForm.username.trim() || !createForm.nickname.trim() || !createForm.password.trim() || createForm.password.length < 8}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              사용자 생성
            </button>
            
            <button
              onClick={testGetUser}
              disabled={loading || !searchUserId.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              특정 사용자 조회
            </button>
            
            <button
              onClick={testLogin}
              disabled={loading}
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50"
            >
              로그인 테스트
            </button>
            
            <button
              onClick={testDeleteUser}
              disabled={loading || !searchUserId.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              사용자 삭제
            </button>
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="text-blue-600">테스트 진행 중...</div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <h3 className="font-semibold text-red-800 mb-2">오류 발생:</h3>
              <pre className="text-red-600 text-sm whitespace-pre-wrap">{error}</pre>
            </div>
          )}

          {result && (
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h3 className="font-semibold text-green-800 mb-2">결과:</h3>
              <pre className="text-green-700 text-sm whitespace-pre-wrap overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Location Service 테스트 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">📍 Location Service 테스트</h2>
          
          {/* 위치 생성 폼 */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-3">위치 생성 정보</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="createLocationId" className="block text-sm font-medium text-gray-700 mb-1">
                  위치 ID:
                </label>
                <input
                  id="createLocationId"
                  type="text"
                  placeholder="loc001"
                  value={locationForm.locationId}
                  onChange={(e) => setLocationForm({...locationForm, locationId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="createBuilding" className="block text-sm font-medium text-gray-700 mb-1">
                  건물명:
                </label>
                <input
                  id="createBuilding"
                  type="text"
                  placeholder="광화문"
                  value={locationForm.building}
                  onChange={(e) => setLocationForm({...locationForm, building: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="createFloor" className="block text-sm font-medium text-gray-700 mb-1">
                  층:
                </label>
                <input
                  id="createFloor"
                  type="text"
                  placeholder="1"
                  value={locationForm.floor}
                  onChange={(e) => setLocationForm({...locationForm, floor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* 위치 ID 입력 필드 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <label htmlFor="searchLocationId" className="block text-sm font-medium text-gray-700 mb-2">
              조회/삭제할 위치 ID:
            </label>
            <input
              id="searchLocationId"
              type="text"
              placeholder="loc001"
              value={searchLocationId}
              onChange={(e) => setSearchLocationId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <button
              onClick={testGetAllLocations}
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              모든 위치 조회
            </button>
            
            <button
              onClick={testCreateLocation}
              disabled={loading || !locationForm.locationId.trim() || !locationForm.building.trim() || !locationForm.floor.trim()}
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-50"
            >
              위치 생성
            </button>
            
            <button
              onClick={testGetLocation}
              disabled={loading || !searchLocationId.trim()}
              className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 disabled:opacity-50"
            >
              특정 위치 조회
            </button>
            
            <button
              onClick={testDeleteLocation}
              disabled={loading || !searchLocationId.trim()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
            >
              위치 삭제
            </button>
            
            <button
              onClick={testCreateAllLocations}
              disabled={loading}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
            >
              테스트 데이터 일괄 생성
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">환경 정보</h2>
          <div className="text-sm text-gray-600">
            <p><strong>프론트엔드:</strong> http://localhost:3000</p>
            <p><strong>User Service:</strong> Azure 배포</p>
            <p><strong>Location Service:</strong> Azure 배포</p>
            <p><strong>API 프록시:</strong> /api/users/*, /api/locations/*</p>
          </div>
        </div>
      </div>
    </div>
  );
}
