import {shallowMount} from '@vue/test-utils';
import jest from 'jest';
import TourismService from '../src/services/tourismService'

test('GetApiTokenTest',()=>{
    expect(TourismService.GetApiToken()).toBe(4)
})