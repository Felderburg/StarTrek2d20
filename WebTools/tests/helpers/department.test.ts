import { test, expect, describe } from '@jest/globals';
import { Department, DepartmentsHelper } from '../../src/helpers/department';

describe('DepartmentsHelper', () => {
  test('getDepartments returns all six departments', () => {
    const depts = DepartmentsHelper.instance.getDepartments();
    expect(depts.length).toBe(6);
    expect(depts).toContain(Department.Command);
    expect(depts).toContain(Department.Conn);
    expect(depts).toContain(Department.Security);
    expect(depts).toContain(Department.Engineering);
    expect(depts).toContain(Department.Science);
    expect(depts).toContain(Department.Medicine);
  });

  test('getDepartmentName returns string name', () => {
    expect(
      DepartmentsHelper.instance.getDepartmentName(Department.Command),
    ).toBe('Command');
    expect(DepartmentsHelper.instance.getDepartmentName(Department.Conn)).toBe(
      'Conn',
    );
    expect(
      DepartmentsHelper.instance.getDepartmentName(Department.Security),
    ).toBe('Security');
    expect(
      DepartmentsHelper.instance.getDepartmentName(Department.Engineering),
    ).toBe('Engineering');
    expect(
      DepartmentsHelper.instance.getDepartmentName(Department.Science),
    ).toBe('Science');
    expect(
      DepartmentsHelper.instance.getDepartmentName(Department.Medicine),
    ).toBe('Medicine');
  });

  test('getDepartmentByName returns correct enum', () => {
    expect(DepartmentsHelper.instance.getDepartmentByName('command')).toBe(
      Department.Command,
    );
    expect(DepartmentsHelper.instance.getDepartmentByName('CONN')).toBe(
      Department.Conn,
    );
    expect(DepartmentsHelper.instance.getDepartmentByName('Security')).toBe(
      Department.Security,
    );
  });

  test('getDepartmentByName returns undefined for unknown name', () => {
    expect(
      DepartmentsHelper.instance.getDepartmentByName('Nonexistent'),
    ).toBeUndefined();
  });

  test('singleton instance works', () => {
    expect(DepartmentsHelper.instance).toBe(DepartmentsHelper.instance);
  });
});
